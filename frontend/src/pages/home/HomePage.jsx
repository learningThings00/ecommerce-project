import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../../componenets/Header';
import { ProductGrid } from './ProductGrid';
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    }

    fetchHomeData();
  }, [])

  return (
    <>

      <title>Home</title>

      <link rel="icon" href="home-favicon.png" />

      <Header cart={cart} />


      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  )
}