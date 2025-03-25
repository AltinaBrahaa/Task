import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./styles.css";

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
   
    fetch("http://localhost:5222/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data)) 
      .catch((err) => console.error("Gabim gjatë marrjes së fotove:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="photo-gallery">
          {images.length === 0 ? (
            <p>Nuk ka ende foto të ngarkuara.</p>
          ) : (
            images.map((image) => (
              <div key={image.imageId} className="image-container">
                <img
                  
                  src={`http://localhost:5222${image.filePath}`} 
                  alt="Ngarkuar"
                  className="uploaded-image"
                />
                <p>{image.fileDescription}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
