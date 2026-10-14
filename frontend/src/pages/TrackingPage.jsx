import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router';
import { Header } from '../componenets/Header';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
  const [order, setOrder] = useState(null);
  const { orderId, productId } = useParams();

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return;
  }

  const product = order.products.find(match => match.productId === productId);

  let progress = ((dayjs().valueOf() - order.orderTimeMs) / (product.estimatedDeliveryTimeMs - order.orderTimeMs)) * 100
  progress = progress > 100 ? 100 : progress;

  const isPreparing = progress < 33 && true;
  let isShipped = false;
  const isDelivered = progress === 100 && true;
  if (progress >= 33 && progress < 100) {
    isShipped = true;
  }


  return (
    <>
      <title>Tracking</title>

      <link rel="icon" href="tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {progress >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(product.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {product.product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          <img className="product-image" src={product.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}