import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit.css";
import SliderProductModal from "./SliderProductModal"; 
import SideBar from "./SideBar"; 

interface ProductImage {
  filePath: string;
}

interface Product {
  secondProductId: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  size: string;
  productImages: ProductImage[] | null;
  imageUrl?: string;
}

const EditFirstProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get("http://localhost:5222/api/SecondProduct");
        console.log("Product Response:", productResponse.data);
    
        if (Array.isArray(productResponse.data)) {
          const fetchedProducts = productResponse.data;
    
          const updatedProducts = await Promise.all(
            fetchedProducts.map(async (secondProduct: Product) => {
              console.log("Product ID:", secondProduct.secondProductId);
    
              if (!secondProduct.secondProductId) {
                console.error("Product ID is missing:", secondProduct);
                return secondProduct;
              }
    
              try {
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?productId=${secondProduct.secondProductId}`
                );
                console.log("Images for Product:", imagesResponse.data);
                
                if (imagesResponse.data) {
                  secondProduct.productImages = imagesResponse.data;
                }
    
                if (secondProduct.productImages && secondProduct.productImages.length > 0) {
                    secondProduct.imageUrl = secondProduct.productImages[0].filePath;
                  console.log("Image URL set for product:", secondProduct.name, secondProduct.imageUrl);
                }
    
                return secondProduct;
              } catch (imageError) {
                console.error(`Error fetching images for product ${secondProduct.secondProductId}:`, imageError);
                return secondProduct;
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
    const productToEdit = products.find((product) => product.secondProductId === productId);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (secondProductId: number) => {
    try {
      
      await axios.delete(`http://localhost:5222/api/FirstProduct/${secondProductId}`);
      console.log(`Product with ID ${secondProductId} and associated images deleted successfully.`);
      
      
      setProducts((prevProducts) => prevProducts.filter((product) => product.secondProductId !== secondProductId));
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
        product.secondProductId === updatedProduct.secondProductId ? updatedProduct : product
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
              <div className="col-md-4" key={product.secondProductId}>
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
                    <button onClick={() => handleEdit(product.secondProductId)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.secondProductId)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*isModalOpen && currentProduct && (
            <SliderProductModal
              firstproduct={currentProduct}
              closeModal={closeModal}
              updateProduct={updateProduct}
            />
          )*/}
        </div>
      </div>
    </div>
  );
};

export default EditFirstProduct;