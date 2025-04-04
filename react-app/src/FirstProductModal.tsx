import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditProductModal.css";

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

interface EditProductModalProps {
  product: Product;
  closeModal: () => void;
  updateProduct: (updatedProduct: Product) => void;
}

const notify = (text: string) => toast(text);

const FirstProductModal: React.FC<EditProductModalProps> = ({ product, closeModal, updateProduct }) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

   
    try {
      const response = await axios.put(`http://localhost:5222/api/FirstProduct/${product.firstProductId}`, editedProduct);
      updateProduct(response.data);
      notify("Product updated successfully");

      
      if (imageFile) {
        const formData = new FormData();
        formData.append("File", imageFile);
        formData.append("FileName", imageFile.name);
        formData.append("FirstProductId", editedProduct.firstProductId.toString());

        const imageResponse = await axios.put(
          `http://localhost:5222/api/product-images/${product.firstProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

       
        if (imageResponse.data?.filePath) {
          setEditedProduct((prevProduct) => ({
            ...prevProduct,
            imageUrl: imageResponse.data.filePath,
          }));
        }
      }

      closeModal();
    } catch (error) {
      console.error("Error updating product or image:", error);
      notify("Failed to update product or image");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="modal show">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Edit Product</h2>
          {loading ? (
            <p>Saving product...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                required
              />
              <label>Price</label>
              <input
                type="number"
                name="newPrice"
                value={editedProduct.newPrice}
                onChange={handleChange}
                required
              />
              <label>Size</label>
              <input
                type="text"
                name="size"
                value={editedProduct.size}
                onChange={handleChange}
                required
              />
              <label>Discount</label>
              <input
                type="text"
                name="discount"
                value={editedProduct.discount}
                onChange={handleChange}
                required
              />
              <label>Image</label>
              <input
                type="file"
                onChange={handleImageChange}
              />
              <input type="submit" value="Update Product" />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default FirstProductModal;