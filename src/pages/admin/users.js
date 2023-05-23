import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import Link from "next/link";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState(false);
  const getUsers = async () => {
    const response = await axios.get("/api/v1/admin/users");
    const data = response.data;
    setUsers(data.users);
    // console.log(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  if (!users) {
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
      {users.length !== 0 ? (
        <div className="og">
          <div className="ogf">
            <p>User ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p>Created At</p>
          </div>
          {users &&
            users.map((user) => {
              var extractedDate = extractDateFromCreatedAt(user.createdAt);
              return (
                <Link
                  href={`/admin/user/${user._id}`}
                  className="ogf"
                  key={user._id}
                >
                  <p>{user._id}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.role}</p>
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
