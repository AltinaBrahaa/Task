import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./upload.css";
import Sidebar from "./SideBar";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileDescription, setFileDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      localStorage.setItem(
        "UserRole",
        decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );

      if (
        decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "SuperAdmin"
      ) {
        setIsSuperAdmin(true);
      }
    }

    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5222/api/images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Fetched images:", response.data); 
  
      if (response.data) {
        setImages(response.data);
      } else {
        message.error("No images found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      message.error("Error fetching images.");
    }
  };
  

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setFileDescription(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!isSuperAdmin) {
      message.error("You do not have permission to upload images.");
      return;
    }

    if (!selectedImage) {
      message.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("File", selectedImage);
    formData.append("FileName", fileName);
    formData.append("FileDescription", fileDescription);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post("http://localhost:5222/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUploadSuccess(true);
        setSelectedImage(null);
        setFileDescription("");
        setFileName("");
        fetchImages(); 
        message.success("Image uploaded successfully!");
      } else {
        message.error(`Failed to upload image. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Error uploading image. Please try again.");
    }
  };

  const handleDeleteImage = async (imageId) => {
    console.log("Deleting image with ID:", imageId);  
    if (!imageId || isNaN(imageId)) {
      message.error("Invalid image ID.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`http://localhost:5222/api/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        message.success("Image deleted successfully!");
        fetchImages(); 
      } else {
        message.error("Failed to delete image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      message.error("Error deleting image. Please try again.");
    }
};

  
  
  
  return (
    <div>
      <Navbar />
      <div className="containerr">
        {isSuperAdmin ? (
          <form class="up" onSubmit={handleImageUpload}>
            <input class="upinput" type="file" onChange={handleImageChange} accept="image/*" required />
            <input class="upinput"
              type="text"
              placeholder="Përshkrimi i fotos"
              value={fileDescription}
              onChange={handleDescriptionChange}
            />
            <input class="upinput"
              type="text"
              placeholder="Emri i fotos"
              value={fileName}
              onChange={handleFileNameChange}
            />
            <button type="submit">Ngarko Foto</button>
          </form>
        ) : (
          <p>You do not have permission to upload images.</p>
        )}

        {uploadSuccess && (
          <div>
            <p>Foto e ngarkuar me sukses!</p>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>
        )}


        <div className="image-gallery">
          {images.length > 0 ? (
            images.map((image) => {
              console.log("Image ID:", image.imageId);  
              return (
                <div className="image-card" key={image.imageId}>  
                  <img src={`http://localhost:5222${image.filePath}`} alt={image.fileName} />
                  <div className="image-info">
                    <p>{image.fileName}</p>
                    <p>{image.fileDescription}</p>
                    <button onClick={() => handleDeleteImage(image.imageId)}>Delete</button>  
                  
                  </div>
                </div>
              );
            })
          ) : (
            <p>No images uploaded.</p>
          )}
        </div>
      </div>
    </div>
    );
  };

export default ImageUpload;







/*import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import { hasPointerEvents } from "@testing-library/user-event/dist/utils";
shkruje ne anglisht qe superadmini me mujt me i regjistru users dhe poashtu me i fshi edhe me i editu
const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileDescription, setFileDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); 
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedToken = jwtDecode(token); 
      localStorage.setItem("UserRole", decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

      if (decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "SuperAdmin") {
        setIsSuperAdmin(true);
      }
    }
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setFileDescription(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!isSuperAdmin) {
      message.error("You do not have permission to upload images.");
      return;
    }

    if (!selectedImage) {
      message.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("File", selectedImage);
    formData.append("FileName", fileName);
    formData.append("FileDescription", fileDescription);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post("http://localhost:5222/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUploadSuccess(true);
        setSelectedImage(null);
        setFileDescription("");
        setFileName("");

        fetchImageUrl(response.data.imageId);

        message.success("Image uploaded successfully!");
      } else {
        message.error(`Failed to upload image. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Error uploading image. Please try again.");
    }
  };

  const fetchImageUrl = async (imageId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:5222/api/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.filePath) {
        const fullUrl = `http://localhost:5222${response.data.filePath}`;
        setImageUrl(fullUrl);
      } else {
        message.error("Image not found.");
      }
    } catch (error) {
      console.error("Failed to fetch image URL:", error);
      message.error("Error fetching image URL.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">


        {isSuperAdmin ? (
          <form onSubmit={handleImageUpload}>
            <input type="file" onChange={handleImageChange} accept="image/*" required />
            <input
              type="text"
              placeholder="Përshkrimi i fotos"
              value={fileDescription}
              onChange={handleDescriptionChange}
            />
            <input
              type="text"
              placeholder="Emri i fotos"
              value={fileName}
              onChange={handleFileNameChange}
            />
            <button type="submit">Ngarko Foto</button>
          </form>
        ) : (
          <p>You do not have permission to upload images.</p>
        )}

        {uploadSuccess && (
          <div>
            <p>Foto e ngarkuar me sukses!</p>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;*/
