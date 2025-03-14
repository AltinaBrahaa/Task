import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import './ProductList.css';

const notify = (text: string) => toast(text);

interface Product {
  id: number;
  Emri: string;
  Lloji: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5222/api/Product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        notify('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    navigate(`/edit-product/${product.id}`);
  };

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5222/api/Product/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      notify('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      notify('Failed to delete product.');
    }
  };

  return (
    <>
      <div style={{ position: "fixed", top: 0, right: 0, zIndex: 9999 }}>
        <ToastContainer />
      </div>
      <div className="product-list-container">
        <h1>Product List</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <h2>{product.Emri}</h2>
                <p>{product.Lloji}</p>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
};

export default ProductList;
