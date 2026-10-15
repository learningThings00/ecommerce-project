import axios from "axios";
import { useState } from 'react';
import { formatCurrency } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [showInput, setShowInput] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  function getQuantity(event) {
    setQuantity(Number(event.target.value));
  }

  function keyControl(event) {
    if (event.key === 'Enter') {
      updateCartQuatity();
    }
    if (event.key === 'Escape') {
      setShowInput(false);
      setQuantity(cartItem.quantity);
    }
  }

  const updateCartQuatity = async () => {
    if (showInput) {
      if (quantity === 0) {
        deleteCartItem();
      } else if (quantity < 0 || quantity > 99) {
        setShowInput(false);
        setQuantity(cartItem.quantity);
        return;
      } else {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          quantity
        });
        await loadCart();
      }
    }
    showInput ? setShowInput(false) : setShowInput(true);
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatCurrency(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <span className="quantity-label">{showInput ? (<input value={quantity} type="number" className="quantity-input" onChange={getQuantity} onKeyDown={keyControl} />) : quantity}</span>
          </span>
          <span className="update-quantity-link link-primary" onClick={updateCartQuatity}>
            {showInput ? 'Save' : 'Update'}
          </span>
          <span onClick={deleteCartItem} className="delete-quantity-link link-primary">
            Delete
          </span>
        </div>
      </div>
    </>
  )
}