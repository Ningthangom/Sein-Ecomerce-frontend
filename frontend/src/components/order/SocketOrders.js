import React from "react";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const SocketOrders = ({ orders, handleStatusChange }) => {

        const getBackgroundColor = (orderStatus) => {
          let color;
          if (orderStatus === "Processing") {
              color = 'red';
          } else if (orderStatus === "Dispatched") {
              color = 'grey';
          } else if (orderStatus === "Cancelled") {
              color = 'orange';
          } else if (orderStatus === "Not Processed") {
              color = 'yellow';
          } else if (orderStatus === "Completed") {
              color = 'green';
          }
          return color;
      };
        
     /*  console.log("this is inside socket order: ",JSON.stringify(orders, null, 4)); */
     console.table("this is inside socket order: ",orders);
    return(
  <>
    {orders ? orders.map((order) => (
      <div key={order._id} className="row pb-5">
        <div className="btn btn-block " style={{backgroundColor: getBackgroundColor(order.orderStatus)}}>
        {JSON.stringify(order)}
          {/* <ShowPaymentInfo order={order} showStatus={false} /> */}

          <div className="row">
            <div className="col-md-4">Delivery Status</div>
            <div className="col-md-8">
              <select
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="form-control"
                defaultValue={order.orderStatus}
                name="status"
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        {order.length && order[0].products ? order[0].products.map((p,i) =>(
          <p>{p.product.title}</p>
        ) ): null}
      </div>
    )) : null }
    
  </>
);
}
export default SocketOrders;