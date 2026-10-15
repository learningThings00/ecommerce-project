import { OrderHeader } from "./OrderHeader";
import { OrderProductGrid } from "./OrderProductGrid";


export function OrdersGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrderHeader order={order} />

            <OrderProductGrid order={order} loadCart={loadCart} />
          </div>
        )
      })}
    </div>
  )
}