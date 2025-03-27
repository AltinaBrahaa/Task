import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Slider from "react-slick";
import "./styles.css";

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5222/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

 
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="photo-gallery">
          {images.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            <Slider {...settings}>
              {images.map((image) => (
                <div key={image.imageId} className="image-container">
                  <img
                    src={`http://localhost:5222${image.filePath}`}
                    alt={image.fileName}
                    className="uploaded-image"
                  />
                  <p>{image.fileDescription}</p>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

