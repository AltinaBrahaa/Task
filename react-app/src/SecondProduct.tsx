import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./SideBar";

interface CustomJwtPayload {
  exp: number;
  iat: number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

const SecondProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    oldPrice: "",
    newPrice: "",
    city: "",
    size: "",
    discount: "",
    foto: null,
  });
  const [loading, setLoading] = useState(false);
  const [secondproductId, setSecondProductId] = useState<number | null>(null);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      alert("Ju lutemi logohuni përsëri!");
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const profileResponse = await axios.get("http://localhost:5222/api/SecondProduct", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const productData = profileResponse.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: productData.name || "",
        oldPrice: productData.oldPrice || "",
        newPrice: productData.newPrice || "",
        city: productData.city || "",
        size: productData.size || "",
        discount: productData.discount || "",
      }));
    } catch (error) {
      console.error("Error gjatë marrjes së të dhënave:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!secondproductId) {
      alert("Product ID not available for image upload.");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);
    formData.append("FileName", file.name);
    formData.append("FileDescription", "Përshkrimi i imazhit");
    formData.append("SecondProductId", secondproductId.toString());

    try {
      const response = await axios.post(
        "http://localhost:5222/api/product-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageData = response.data;
      if (imageData && imageData.FilePath) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          foto: imageData.FilePath,
        }));
      }
    } catch (error) {
      console.error("Gabim gjatë ngarkimit të imazhit", error);
      alert("Gabim gjatë ngarkimit të imazhit. Ju lutemi provoni përsëri.");
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "foto") {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please select a valid image file.");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert("File size exceeds 5MB.");
          return;
        }
        await handleImageUpload(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      alert("You need to be logged in to add a product.");
      return;
    }

    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);

      if (!decodedToken) {
        setLoading(false);
        alert("Token decoding failed. Please log in again.");
        return;
      }

      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      if (!userId) {
        setLoading(false);
        alert("User ID is missing in the token. Please log in again.");
        return;
      }

      const formDataToSend = {
        name: formData.name || "",
        oldPrice: formData.oldPrice || "",
        newPrice: formData.newPrice || "",
        city: formData.city || "",
        size: formData.size || "",
        discount: formData.discount || "",
        foto: formData.foto || "",
        userId: userId,
      };

      const response = await axios.post(
        "http://localhost:5222/api/SecondProduct",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSecondProductId(response.data.SecondProductId);
      alert("Product added successfully!");
    } catch (error: any) {
      setLoading(false);
      alert(`Error: ${error.message || "Something went wrong!"}`);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5 mb-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="fst-italic mb-4 text-center">Add Second Product</h4>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {[
                      { label: "Name", name: "name", type: "text", value: formData.name },
                      { label: "Old Price", name: "oldPrice", type: "number", value: formData.oldPrice },
                      { label: "New Price", name: "newPrice", type: "number", value: formData.newPrice },
                      { label: "City", name: "city", type: "text", value: formData.city },
                      { label: "Size", name: "size", type: "text", value: formData.size },
                      { label: "Discount", name: "discount", type: "number", value: formData.discount },
                    ].map(({ label, name, type, value }) => (
                      <div className="col-md-6 mb-3" key={name}>
                        <div className="form-group">
                          <label htmlFor={name} className="text-muted">{label}</label>
                          <input
                            type={type}
                            className="form-control"
                            id={name}
                            name={name}
                            value={value || ""}
                            onChange={handleChange}
                            placeholder={`Enter ${label.toLowerCase()}`}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="col-md-12 mb-3 text-center">
                      <button type="submit" className="btn btn-primary">
                        {loading ? "Saving..." : "Save Product"}
                      </button>
                    </div>
                  </div>
                </form>

                <input
                  type="file"
                  className="form-control mb-3"
                  id="foto"
                  name="foto"
                  onChange={handleChange}
                />

                {formData.foto && (
                  <div className="mb-3 text-center">
                    <img
                      src={formData.foto}
                      alt="Selected"
                      className="img-thumbnail"
                      style={{ width: "200px", height: "200px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondProduct;
