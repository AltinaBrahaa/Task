import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    emri: "",
    pershkrimi: "",
    cmimi: "",
    sasia: "",
    kategoria: "",
    foto: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    formDataToSend.append("emri", formData.emri);
    formDataToSend.append("pershkrimi", formData.pershkrimi);
    formDataToSend.append("cmimi", formData.cmimi);
    formDataToSend.append("sasia", formData.sasia);
    formDataToSend.append("kategoria", formData.kategoria);
    formDataToSend.append("foto", formData.foto);

    try {
      const response = await axios.post("http://localhost:5000/api/products", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Produkti u shtua me sukses", response.data);
    } catch (error) {
      console.error("Gabim gjatë shtimit të produktit", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="emri" placeholder="Emri i produktit" onChange={handleChange} required />
      <textarea name="pershkrimi" placeholder="Përshkrimi" onChange={handleChange} required />
      <input type="number" name="cmimi" placeholder="Çmimi" onChange={handleChange} required />
      <input type="number" name="sasia" placeholder="Sasia" onChange={handleChange} required />
      <input type="text" name="kategoria" placeholder="Kategoria" onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handleImageUpload} required />
      <button type="submit">Shto Produktin</button>
    </form>
  );
};

export default ProductForm;
