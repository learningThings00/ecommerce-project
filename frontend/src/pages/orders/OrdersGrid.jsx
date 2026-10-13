import { OrderHeader } from "./OrderHeader";
import { OrderProductGrid } from "./OrderProductGrid";


export function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrderHeader order={order} />

            <OrderProductGrid order={order} />
          </div>
        )
      })}
    </div>
  )
}