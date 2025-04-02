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
  oldPrice: number;
  size: string;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

interface FirstProduct {
  firstProductId: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  size: string;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

interface SecondProduct {
  secondProductId: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  size: string;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [firstProducts, setFirstProducts] = useState<FirstProduct[]>([]);
  const [secondProducts, setSecondProducts] = useState<SecondProduct[]>([]);

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
             
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?productId=${productSl.productSlId}`
                );
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

    const fetchFirstProducts = async () => {
      try {
        const firstProductResponse = await axios.get("http://localhost:5222/api/FirstProduct");
        console.log("First Product Response:", firstProductResponse.data);
    
        if (Array.isArray(firstProductResponse.data)) {
          const fetchedFirstProducts = firstProductResponse.data;
    
          const updatedFirstProducts = await Promise.all(
            fetchedFirstProducts.map(async (firstProduct: FirstProduct) => {
              console.log("First Product ID:", firstProduct.firstProductId);
    
              if (!firstProduct.firstProductId) {
                console.error("First Product ID is missing:", firstProduct);
                return firstProduct;
              }
    
              try {
                // Fetch images using the query parameter
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?firstProductId=${firstProduct.firstProductId}`
                );
                console.log("Images for First Product:", imagesResponse.data);
    
                if (imagesResponse.data) {
                  firstProduct.productImages = imagesResponse.data;
                }
    
                if (firstProduct.productImages && firstProduct.productImages.length > 0) {
                  firstProduct.imageUrl = firstProduct.productImages[0].filePath;
                  console.log("Image URL set for first product:", firstProduct.name, firstProduct.imageUrl);
                }
    
                return firstProduct;
              } catch (imageError) {
                console.error(`Error fetching images for first product ${firstProduct.firstProductId}:`, imageError);
                return firstProduct;
              }
            })
          );
    
          setFirstProducts(updatedFirstProducts);
        } else {
          console.error("First Product data is not an array");
        }
      } catch (error) {
        console.error("Error fetching first products:", error);
      }
    };
    

    const fetchSecondProducts = async () => {
      try {
        const secondProductResponse = await axios.get("http://localhost:5222/api/SecondProduct");
        console.log("Second Product Response:", secondProductResponse.data);
    
        if (Array.isArray(secondProductResponse.data)) {
          const fetchedSecondProducts = secondProductResponse.data;
    
          const updatedSecondProducts = await Promise.all(
            fetchedSecondProducts.map(async (secondProduct: SecondProduct) => {
              console.log("Second Product ID:", secondProduct.secondProductId);
    
              if (!secondProduct.secondProductId) {
                console.error("Second Product ID is missing:", secondProduct);
                return secondProduct;
              }
    
              try {
  
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?secondProductId=${secondProduct.secondProductId}`
                );
                console.log("Images for Second Product:", imagesResponse.data);
    
                if (imagesResponse.data) {
                  secondProduct.productImages = imagesResponse.data;
                }
    
                if (secondProduct.productImages && secondProduct.productImages.length > 0) {
                  secondProduct.imageUrl = secondProduct.productImages[0].filePath;
                  console.log("Image URL set for second product:", secondProduct.name, secondProduct.imageUrl);
                }
    
                return secondProduct;
              } catch (imageError) {
                console.error(`Error fetching images for second product ${secondProduct.secondProductId}:`, imageError);
                return secondProduct;
              }
            })
          );
    
          setSecondProducts(updatedSecondProducts);
        } else {
          console.error("Second Product data is not an array");
        }
      } catch (error) {
        console.error("Error fetching second products:", error);
      }
    };    

    fetchProducts();
    fetchFirstProducts();
    fetchSecondProducts();
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
    {/* Slider */}
    <div className="col-md-6">
      <div className="parent">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.productSlId} className="product-slider-item">
              <div className="product-image">
                {product.imageUrl ? (
                  <div className="product-image-container">
                    <img
                      src={`http://localhost:5222${product.imageUrl}`}
                      alt={product.name}
                      className="slider-image"
                    />
                    <div className="overlay">
                      <div className="product-details">
                        <h4>{product.name}</h4>
                        <p className="price new-price">${product.newPrice}</p>
                        <p className="price old-price">${product.oldPrice}</p>
                        <p className="size">Size: {product.size}</p>
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

    <div className="col-md-4">
      <div className="vertical-div">
        {firstProducts.length > 0 && firstProducts[0].imageUrl ? (
          <div className="product-image-container">
            <img
              src={`http://localhost:5222${firstProducts[0].imageUrl}`}
              alt={firstProducts[0].name}
              className="product-image-img"
            />
            <div className="overlayy">
              <div className="product-details">
                <h4>{firstProducts[0].name}</h4>
                <p className="price new-price">${firstProducts[0].newPrice}</p>
                <p className="price old-price">${firstProducts[0].oldPrice}</p>
                <p className="size">Size: {firstProducts[0].size}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No image available for the first product.</p>
        )}
      </div>

      <div className="vertical-div">
        {secondProducts.length > 0 && secondProducts[0].imageUrl ? (
          <div className="product-image-container">
            <img
              src={`http://localhost:5222${secondProducts[0].imageUrl}`}
              alt={secondProducts[0].name}
              className="product-image-imgg"
            />
            <div className="overlayy">
              <div className="product-details">
                <h4>{secondProducts[0].name}</h4>
                <p className="price new-price">${secondProducts[0].newPrice}</p>
                <p className="price old-price">${secondProducts[0].oldPrice}</p>
                <p className="size">Size: {secondProducts[0].size}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No image available for the second product.</p>
        )}
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default HomePage;



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
  oldPrice: number;
  size: string;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

interface FirstProduct {
  firstProductId: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  size: string;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

interface SecondProduct {
  secondProductId: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  size: string;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [firstProducts, setFirstProducts] = useState<FirstProduct[]>([]);
  const [secondProducts, setSecondProducts] = useState<SecondProduct[]>([]);

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
                // Fetch images using the query parameter
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?productId=${productSl.productSlId}`
                );
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

    const fetchFirstProducts = async () => {
      try {
        const firstProductResponse = await axios.get("http://localhost:5222/api/FirstProduct");
        console.log("First Product Response:", firstProductResponse.data);
    
        if (Array.isArray(firstProductResponse.data)) {
          const fetchedFirstProducts = firstProductResponse.data;
    
          const updatedFirstProducts = await Promise.all(
            fetchedFirstProducts.map(async (firstProduct: FirstProduct) => {
              console.log("First Product ID:", firstProduct.firstProductId);
    
              if (!firstProduct.firstProductId) {
                console.error("First Product ID is missing:", firstProduct);
                return firstProduct;
              }
    
              try {
                // Fetch images using the query parameter
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?firstProductId=${firstProduct.firstProductId}`
                );
                console.log("Images for First Product:", imagesResponse.data);
    
                if (imagesResponse.data) {
                  firstProduct.productImages = imagesResponse.data;
                }
    
                if (firstProduct.productImages && firstProduct.productImages.length > 0) {
                  firstProduct.imageUrl = firstProduct.productImages[0].filePath;
                  console.log("Image URL set for first product:", firstProduct.name, firstProduct.imageUrl);
                }
    
                return firstProduct;
              } catch (imageError) {
                console.error(`Error fetching images for first product ${firstProduct.firstProductId}:`, imageError);
                return firstProduct;
              }
            })
          );
    
          setFirstProducts(updatedFirstProducts);
        } else {
          console.error("First Product data is not an array");
        }
      } catch (error) {
        console.error("Error fetching first products:", error);
      }
    };
    

    const fetchSecondProducts = async () => {
      try {
        const secondProductResponse = await axios.get("http://localhost:5222/api/SecondProduct");
        console.log("Second Product Response:", secondProductResponse.data);
    
        if (Array.isArray(secondProductResponse.data)) {
          const fetchedSecondProducts = secondProductResponse.data;
    
          const updatedSecondProducts = await Promise.all(
            fetchedSecondProducts.map(async (secondProduct: SecondProduct) => {
              console.log("Second Product ID:", secondProduct.secondProductId);
    
              if (!secondProduct.secondProductId) {
                console.error("Second Product ID is missing:", secondProduct);
                return secondProduct;
              }
    
              try {
  
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?secondProductId=${secondProduct.secondProductId}`
                );
                console.log("Images for Second Product:", imagesResponse.data);
    
                if (imagesResponse.data) {
                  secondProduct.productImages = imagesResponse.data;
                }
    
                if (secondProduct.productImages && secondProduct.productImages.length > 0) {
                  secondProduct.imageUrl = secondProduct.productImages[0].filePath;
                  console.log("Image URL set for second product:", secondProduct.name, secondProduct.imageUrl);
                }
    
                return secondProduct;
              } catch (imageError) {
                console.error(`Error fetching images for second product ${secondProduct.secondProductId}:`, imageError);
                return secondProduct;
              }
            })
          );
    
          setSecondProducts(updatedSecondProducts);
        } else {
          console.error("Second Product data is not an array");
        }
      } catch (error) {
        console.error("Error fetching second products:", error);
      }
    };    

    fetchProducts();
    fetchFirstProducts();
    fetchSecondProducts();
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
     
          <div className="col-md-6">
            <div className="parent">
              <div className="div1">
                <Slider {...settings}>
                  {products.map((product) => (
                    <div key={product.productSlId} className="product-slider-item">
                      <div className="product-image">
                        {product.imageUrl ? (
                          <div className="product-image-container">
                            <img
                              src={`http://localhost:5222${product.imageUrl}`}
                              alt={product.name}
                              className="slider-image"
                            />
                            <div className="overlay">
                              <div className="text">
                                <h4>{product.name}</h4>
                                <p>${product.newPrice}</p>
                                <p>${product.oldPrice}</p>
                                <p> {product.size}</p>
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
              {firstProducts.length > 0 && firstProducts[0].imageUrl ? (
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5222${firstProducts[0].imageUrl}`}
                    alt={firstProducts[0].name}
                    className="product-image-img"
                  />
                  <div className="overlay">
                    <div className="text">
                      <h4>{firstProducts[0].name}</h4>
                      <p>${firstProducts[0].newPrice}</p>
                      <p>${firstProducts[0].oldPrice}</p>
                      <p>{firstProducts[0].size}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No image available for the first product.</p>
              )}
            </div>

            <div className="vertical-div">
              {secondProducts.length > 0 && secondProducts[0].imageUrl ? (
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5222${secondProducts[0].imageUrl}`}
                    alt={secondProducts[0].name}
                    className="product-image-img"
                  />
                  <div className="overlay">
                    <div className="text">
                      <h4>{secondProducts[0].name}</h4>
                      <p>${secondProducts[0].newPrice}</p>
                      <p>${secondProducts[0].oldPrice}</p>
                      <p>{secondProducts[0].size}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No image available for the second product.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
*/

