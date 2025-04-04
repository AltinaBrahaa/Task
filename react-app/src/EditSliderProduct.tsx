import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit.css";
import SliderProductModal from "./SliderProductModal"; 
import SideBar from "./SideBar"; 

interface ProductImage {
  filePath: string;
}

interface Product {
  productSlId: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  size: string;
  discount: number;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

const EditSliderProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

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

    fetchProducts();
  }, []);

  const handleEdit = (productId: number) => {
    const productToEdit = products.find((product) => product.productSlId === productId);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (productSlId: number) => {
    try {
     
      await axios.delete(`http://localhost:5222/api/ProductSl/${productSlId}`);
      console.log(`Product with ID ${productSlId} and associated images deleted successfully.`);
      
   
      setProducts((prevProducts) => prevProducts.filter((product) => product.productSlId !== productSlId));
    } catch (error) {
      console.error("Error deleting product or image:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productSlId === updatedProduct.productSlId ? updatedProduct : product
      )
    );
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <SideBar />
        <div className="products-section">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product.productSlId}>
                <div className="product-imagee-container">
                  <img
                    src={`http://localhost:5222${product.imageUrl}`}
                    alt={product.name}
                    className="product-imagee"
                  />
                  <div className="product-detailss">
                    <h4>{product.name}</h4>
                    <p className="price">${product.newPrice}</p>
                    <p className="size">Size: {product.size}</p>
                    <p className="discount">Discount: {product.discount}</p>
                    <button onClick={() => handleEdit(product.productSlId)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.productSlId)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && currentProduct && (
            <SliderProductModal
              product={currentProduct}
              closeModal={closeModal}
              updateProduct={updateProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSliderProduct;






/*import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit.css";
import SliderProductModal from "./SliderProductModal"; 
import SideBar from "./SideBar"; 

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

const EditSliderProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

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

    fetchProducts();
  }, []);

  const handleEdit = (productId: number) => {
    const productToEdit = products.find((product) => product.productSlId === productId);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productSlId === updatedProduct.productSlId ? updatedProduct : product
      )
    );
  };

  return (
    <div className="main-container">
     


      <div className="content-container">
       
        <SideBar />

        <div className="products-section">
      
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product.productSlId}>
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5222${product.imageUrl}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p className="price">${product.newPrice}</p>
                    <p className="size">Size: {product.size}</p>
                    <button onClick={() => handleEdit(product.productSlId)}>Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

     
          {isModalOpen && currentProduct && (
            <SliderProductModal
              product={currentProduct}
              closeModal={closeModal}
              updateProduct={updateProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSliderProduct;*/



/*import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit.css";


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
const EditSliderProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

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

    fetchProducts();
  }, []);

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5222/api/product-images/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.productSlId !== productId));
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  const handleEdit = (productId: number) => {

    setSelectedProductId(productId);
  };

  return (
    
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.productSlId}>
            <div className="product-image-container">
              <img
                src={`http://localhost:5222${product.imageUrl}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h4>{product.name}</h4>
                <p className="price">${product.newPrice}</p>
                <p className="size">Size: {product.size}</p>
                <button onClick={() => handleEdit(product.productSlId)}>Edit</button>
                <button onClick={() => handleDelete(product.productSlId)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProductId && (
        <div>

          <h3>Edit Product {selectedProductId}</h3>
    
        </div>
      )}
    </div>

  );
};

export default EditSliderProduct;*/
