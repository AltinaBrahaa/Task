import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit.css";
import FirstProductModal from "./FirstProductModal"; 
import SideBar from "./SideBar"; 

interface ProductImage {
  filePath: string;
}

interface Product {
  firstProductId: number;
  name: string;
  newPrice: number;
  oldPrice: number;
  size: string;
  discount: number;
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
        const productResponse = await axios.get("http://localhost:5222/api/FirstProduct");
        console.log("Product Response:", productResponse.data);
    
        if (Array.isArray(productResponse.data)) {
          const fetchedProducts = productResponse.data;
    
          const updatedProducts = await Promise.all(
            fetchedProducts.map(async (firstProduct: Product) => {
              console.log("Product ID:", firstProduct.firstProductId);
    
              if (!firstProduct.firstProductId) {
                console.error("Product ID is missing:", firstProduct);
                return firstProduct;
              }
    
              try {
                const imagesResponse = await axios.get(
                  `http://localhost:5222/api/product-images/by-product?productId=${firstProduct.firstProductId}`
                );
                console.log("Images for Product:", imagesResponse.data);
                
                if (imagesResponse.data) {
                  firstProduct.productImages = imagesResponse.data;
                }
    
                if (firstProduct.productImages && firstProduct.productImages.length > 0) {
                    firstProduct.imageUrl = firstProduct.productImages[0].filePath;
                  console.log("Image URL set for product:", firstProduct.name, firstProduct.imageUrl);
                }
    
                return firstProduct;
              } catch (imageError) {
                console.error(`Error fetching images for product ${firstProduct.firstProductId}:`, imageError);
                return firstProduct;
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
    const productToEdit = products.find((product) => product.firstProductId === productId);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (firstProductId: number) => {
    try {
      
      await axios.delete(`http://localhost:5222/api/FirstProduct/${firstProductId}`);
      console.log(`Product with ID ${firstProductId} and associated images deleted successfully.`);
      
      
      setProducts((prevProducts) => prevProducts.filter((product) => product.firstProductId !== firstProductId));
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
        product.firstProductId === updatedProduct.firstProductId ? updatedProduct : product
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
              <div className="col-md-4" key={product.firstProductId}>
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
                    <button onClick={() => handleEdit(product.firstProductId)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.firstProductId)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && currentProduct && (
            <FirstProductModal
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

export default EditFirstProduct;