import dayjs from "dayjs";
import { Fragment } from "react";
import { Link } from "react-router";

export function OrderProductGrid({ order }) {
  return (
    <div className="order-details-grid">

      {order.products.map((orderProduct) => {
        let progress = ((dayjs().valueOf() - order.orderTimeMs) / (orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs)) * 100
        progress = progress > 100 ? 100 : progress;

        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                {progress === 100 ? 'Delivered on' : 'Arriving on'}: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}