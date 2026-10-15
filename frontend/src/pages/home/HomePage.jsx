import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';
import { Header } from '../../componenets/Header';
import { ProductGrid } from './ProductGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');



  useEffect(() => {
    const fetchHomeData = async () => {
      if (search) {
        const response = await axios.get(`/api/products?search=${search}`);
        setProducts(response.data)
      } else {
        const response = await axios.get('/api/products')
        setProducts(response.data);
      }
    }
    fetchHomeData();
  }, [search])

  return (
    <>

      <title>Home</title>

      <link rel="icon" href="home-favicon.png" />

      <Header cart={cart} />


      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </>
  )
}