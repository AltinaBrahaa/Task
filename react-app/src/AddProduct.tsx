import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

interface Product {
  Emri: string;
  Lloji: string;
}

const AddProduct = () => {
  const [product, setProduct] = useState<Product>({ Emri: '', Lloji: '' });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/Product', product); 
      setMessage('Product added successfully!');
      setProduct({ Emri: '', Lloji: '' }); 
    } catch (error) {
      setMessage('Failed to add product.');
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Emri">Product Name:</label>
          <input
            type="text"
            id="Emri"
            name="Emri"
            value={product.Emri}
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="Lloji">Product Type:</label>
          <input
            type="text"
            id="Lloji"
            name="Lloji"
            value={product.Lloji}
            onChange={handleChange}
            required
            placeholder="Enter product type"
          />
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddProduct;
