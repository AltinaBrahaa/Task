// src/services/ProductService.js
/*
import axios from 'axios';

const apiUrl = 'http://localhost:5222/api/Product';  // Replace with your correct API URL

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    return [];
  }
};

// Create a new product
export const createProduct = async (product) => {
  try {
    const response = await axios.post(apiUrl, product);
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
    return null;
  }
};

// Update an existing product
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product', error);
    return null;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  } catch (error) {
    console.error('Error deleting product', error);
    return null;
  }
};*/
// src/services/ProductService.ts
// src/services/ProductService.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/Product';

// Remove TypeScript type annotations
export const getProducts = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(apiUrl, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${apiUrl}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};
