import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

interface ProductImage {
  filePath: string;
}

interface Product {
  productSlId: number;
  name: string;
  newPrice: number;
  productImages: ProductImage[] | null;
  imageUrl?: string;  
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get("http://localhost:5222/api/ProductSl");
        console.log("Product Response:", productResponse.data); 
        if (Array.isArray(productResponse.data)) {
          const fetchedProducts = productResponse.data;

          const updatedProducts = await Promise.all(
            fetchedProducts.map(async (productSl: Product) => {
              console.log("Product ID:", productSl.productSlId);

              if (!productSl.productSlId) {
                console.error("Product ID is missing:", productSl);
                return productSl;
              }

              try {
                const imagesResponse = await axios.get(`http://localhost:5222/api/product-images/by-product/${productSl.productSlId}`);
                console.log("Images for Product:", imagesResponse.data);

                if (imagesResponse.data) {
                  productSl.productImages = imagesResponse.data;
                }

                if (productSl.productImages && productSl.productImages.length > 0) {
                  productSl.imageUrl = productSl.productImages[0].filePath;
                  console.log("Image URL set for product:", productSl.name, productSl.imageUrl); 
                }

                return productSl;
              } catch (imageError) {
                console.error(`Error fetching images for product ${productSl.productSlId}:`, imageError);
                return productSl;
              }
            })
          );

          setProducts(updatedProducts);
        } else {
          console.error("Product data is not an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="parent">
              <div className="div1">
                <Slider {...settings}>
                  {products.map((productSl) => (
                    <div key={productSl.productSlId} className="product-slider-item">
                      <div className="product-image">
                        {productSl.imageUrl ? (  
                          <div className="product-image-container">
                            <img
                              src={`http://localhost:5222${productSl.imageUrl}`}  
                              alt={productSl.name}
                              className="slider-image"
                            />
                            <div className="overlay">
                              <div className="text">
                                <h4>{productSl.name}</h4>
                                <p>${productSl.newPrice}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p>No images available for this product.</p>  
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vertical-div">
              <h5>Content for the first</h5>
            </div>
            <div className="vertical-div">
              <h5>Content for the second</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;



/*qekjo bon shum mmir i ka slider edche dy diva anash import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

interface ProductImage {
  filePath: string;
}

interface Product {
  productSlId: number;
  name: string;
  newPrice: number;
  productImages: ProductImage[] | null;
  imageUrl?: string;  
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get("http://localhost:5222/api/ProductSl");
        console.log("Product Response:", productResponse.data); 
        if (Array.isArray(productResponse.data)) {
          const fetchedProducts = productResponse.data;

          const updatedProducts = await Promise.all(
            fetchedProducts.map(async (productSl: Product) => {
              console.log("Product ID:", productSl.productSlId);

              if (!productSl.productSlId) {
                console.error("Product ID is missing:", productSl);
                return productSl;
              }

              try {
                const imagesResponse = await axios.get(`http://localhost:5222/api/product-images/by-product/${productSl.productSlId}`);
                console.log("Images for Product:", imagesResponse.data);

                if (imagesResponse.data) {
                  productSl.productImages = imagesResponse.data;
                }

                if (productSl.productImages && productSl.productImages.length > 0) {
                  productSl.imageUrl = productSl.productImages[0].filePath;
                  console.log("Image URL set for product:", productSl.name, productSl.imageUrl); 
                }

                return productSl;
              } catch (imageError) {
                console.error(`Error fetching images for product ${productSl.productSlId}:`, imageError);
                return productSl;
              }
            })
          );

          setProducts(updatedProducts);
        } else {
          console.error("Product data is not an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="parent">
              <div className="div1">
                <Slider {...settings}>
                  {products.map((productSl) => (
                    <div key={productSl.productSlId} className="product-slider-item">
                      <div className="product-image">
                        {productSl.imageUrl ? (  
                          <div className="product-image-container">
                            <img
                              src={`http://localhost:5222${productSl.imageUrl}`}  
                              alt={productSl.name}
                              className="slider-image"
                            />
                            <div className="overlay">
                              <div className="text">
                                <h4>{productSl.name}</h4>
                                <p>${productSl.newPrice}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p>No images available for this product.</p>  
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="vertical-div">
              <p>Content for the first</p>
            </div>
            <div className="vertical-div">
              <p>Content for the second </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;*/


/*import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

interface ProductImage {
  filePath: string;
}

interface Product {
  productSlId: number;
  name: string;
  newPrice: number;
  productImages: ProductImage[] | null;
  imageUrl?: string;  
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get("http://localhost:5222/api/ProductSl");
        console.log("Product Response:", productResponse.data); 
        if (Array.isArray(productResponse.data)) {
          const fetchedProducts = productResponse.data;

          const updatedProducts = await Promise.all(
            fetchedProducts.map(async (productSl: Product) => {
              console.log("Product ID:", productSl.productSlId);

              if (!productSl.productSlId) {
                console.error("Product ID is missing:", productSl);
                return productSl;
              }

              try {
                const imagesResponse = await axios.get(`http://localhost:5222/api/product-images/by-product/${productSl.productSlId}`);
                console.log("Images for Product:", imagesResponse.data);

                if (imagesResponse.data) {
                  productSl.productImages = imagesResponse.data;
                }

                if (productSl.productImages && productSl.productImages.length > 0) {
                  productSl.imageUrl = productSl.productImages[0].filePath;
                  console.log("Image URL set for product:", productSl.name, productSl.imageUrl); 
                }

                return productSl;
              } catch (imageError) {
                console.error(`Error fetching images for product ${productSl.productSlId}:`, imageError);
                return productSl;
              }
            })
          );

          setProducts(updatedProducts);
        } else {
          console.error("Product data is not an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="parent">
          <div className="div1">
            <Slider {...settings}>
              {products.map((productSl) => (
                <div key={productSl.productSlId} className="product-slider-item">
                  <div className="product-image">
                    {productSl.imageUrl ? (  
                      <div className="product-image-container">
                        <img
                          src={`http://localhost:5222${productSl.imageUrl}`}  
                          alt={productSl.name}
                          className="slider-image"
                        />
                        <div className="overlay">
                          <div className="text">
                            <h4>{productSl.name}</h4>
                            <p>${productSl.newPrice}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>No images available for this product.</p>  
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;*/












/*import "slick-carousel/slick/slick.css"; 
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
    
export default HomePage;*/