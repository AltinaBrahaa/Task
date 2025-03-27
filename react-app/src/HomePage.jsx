import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Slider from "react-slick";
import "./styles.css";

const HomePage = () => {

    return (
        <>
          <Navbar />
          <div className="container">
            <div className="photo-gallery">
            </div>
          </div>
        </>
      );
    };
    
export default HomePage;