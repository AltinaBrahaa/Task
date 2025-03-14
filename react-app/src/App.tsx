import axios, {AxiosResponse} from 'axios';
import { useEffect } from 'react';
import './App.css';
import React from 'react';
import AddProduct from './AddProduct';

function App() {

  useEffect(() => {
    axios.get('http://localhost:5000/Product')
    .then((response: AxiosResponse<any>) => {
        console.log(response.data);
    })
  }, [])
  
  return (
    <div>
      <AddProduct />
    </div>
 
  );
}

export default App;
