import axios from "axios";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/money";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOptions.map((deliveryOption) => {


        return (
          <div key={deliveryOption.id} className="delivery-option" onClick={async () => {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id
            });
            await loadCart();
          }}>
            <input type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => { }}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">
                {deliveryOption.priceCents > 0 ? `${formatCurrency(deliveryOption.priceCents)} - shipping` : 'FREE shipping'}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}