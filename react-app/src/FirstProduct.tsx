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

const FirstProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    oldPrice: "",
    newPrice: "",
    city: "",
    size: "",
    discount: "",
    foto: null,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 
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
      const profileResponse = await axios.get("http://localhost:5222/api/FirstProduct", {
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
    const formData = new FormData();
    
    formData.append("File", file);
    

    formData.append("FileName", file.name);
    

    formData.append("FileDescription", "Përshkrimi i imazhit"); 
    
 
    formData.append("FirstProductId", "3"); 
  
    console.log("Duke dërguar:", formData);
  
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
      console.log("Përgjigja nga serveri:", response.data);
  
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

  const handleRemovePhoto = async () => {
    try {
      const response = await axios.delete("http://localhost:5222/api/product-images", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        foto: null,
      }));
      alert("Photo removed successfully!");
    } catch (error) {
      console.error("Error removing photo:", error);
      alert("Error removing photo. Please try again.");
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
        alert("User  ID is missing in the token. Please log in again.");
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
        "http://localhost:5222/api/FirstProduct",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Product added successfully!");
      alert("Product added successfully!");

    } catch (error: any) {
      setLoading(false); 
  
      if (error.response && error.response.data) {
        setErrorMessage(`Error: ${error.response.data.message || error.response.data}`);
        console.error("Gabim gjatë krijimit të produktit:", error.response?.data);
      } else {
        setErrorMessage(`Error: ${error.message || "Something went wrong!"}`);
      }
      alert(`Error: ${error.message || "Something went wrong!"}`);
    }
  }

  return (
    <>
      <Sidebar />
      <div className="container mt-5 mb-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="fst-italic mb-4 text-center">Add Product</h4>
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
                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn btn-danger mb-3"
                    onClick={handleRemovePhoto}
                  >
                    Remove Photo
                  </button>
                </div>
                <input
                  type="file"
                  className="form-control mb-3"
                  id="foto"
                  name="foto"
                  onChange={handleChange}
                />
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="name" className="text-muted">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="oldPrice" className="text-muted">Old Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="oldPrice"
                          name="oldPrice"
                          value={formData.oldPrice || ""}
                          onChange={handleChange}
                          placeholder="Enter old price"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="newPrice" className="text-muted">New Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="newPrice"
                          name="newPrice"
                          value={formData.newPrice || ""}
                          onChange={handleChange}
                          placeholder="Enter new price"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="city" className="text-muted">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city || ""}
                          onChange={handleChange}
                          placeholder="Enter city"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="size" className="text-muted">Size</label>
                        <input
                          type="text"
                          className="form-control"
                          id="size"
                          name="size"
                          value={formData.size || ""}
                          onChange={handleChange}
                          placeholder="Enter size"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="discount" className="text-muted">Discount</label>
                        <input
                          type="number"
                          className="form-control"
                          id="discount"
                          name="discount"
                          value={formData.discount || ""}
                          onChange={handleChange}
                          placeholder="Enter discount"
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mb-3 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstProduct;