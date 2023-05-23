import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import Link from "next/link";
import axios from "axios";

const User = () => {
  const [orders, setOrders] = useState(false);
  const getOrders = async () => {
    const response = await axios.get("/api/v1/admin/orders");
    const data = response.data;
    setOrders(data.orders);
    console.log(data);
  };
  useEffect(() => {
    getOrders();
  }, []);

  if (!orders) {
    return <Loader />;
  }
  function extractDateFromCreatedAt(doc) {
    var createdAtDate = new Date(doc);
    var day = createdAtDate.getDate();
    var month = createdAtDate.getMonth() + 1; // Adding 1 to the month since it is zero-based
    var year = createdAtDate.getFullYear().toString().slice(-2); // Extracting the last two digits of the year

    // Formatting day, month, and year to have two digits if needed
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return day + "/" + month + "/" + year;
  }
  return (
    <>
      {orders.length !== 0 ? (
        <div className="og">
          <div className="ogf">
            <p>Order ID</p>
            <p>Status</p>
            <p>Paid</p>
            <p>Created At</p>
          </div>
          {orders &&
            orders.map((order) => {
              var extractedDate = extractDateFromCreatedAt(order.paidAt);
              return (
                <Link
                  href={`/admin/order/${order._id}`}
                  className="ogf"
                  key={order._id}
                >
                  <p>{order._id}</p>
                  <p>{order.orderStatus}</p>
                  <p>{order.paymentInfo.status}</p>
                  <p>{extractedDate}</p>
                </Link>
              );
            })}
        </div>
      ) : (
        <div className="account_cont">
          <h1>No Orders Yet</h1>
        </div>
      )}
    </>
  );
};

export default User;
