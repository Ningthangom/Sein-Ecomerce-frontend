import React from "react";

const ShowPaymentInfo = ({ order }) => (
  <div >
    <p  style={{cursor: "text"}}>
      <span>payment Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Amount:
        {(order.paymentIntent.amount / 100).toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD",
        })}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span className="bg-primary">Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Orderd on:
        {new Date(order.createdAt).toLocaleDateString()}
      </span>
      {" / "}
      <span className="badge bg-primary text-white">
        STATUS: {order.orderStatus}
      </span>
    </p>
  </div>
);

export default ShowPaymentInfo;
