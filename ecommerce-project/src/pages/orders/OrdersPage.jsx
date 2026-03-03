import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { OrderHeader } from "./OrderHeader";
import { OrderDetails } from "./OrderDetails";
import "./OrdersPage.css";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };

    fetchOrderData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrderHeader order={order} />

                <OrderDetails order={order} loadCart={loadCart} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
