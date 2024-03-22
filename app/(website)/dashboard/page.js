// pages/dashboard.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          setUserData(response.data.user); // Accessing nested user data
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          // Handle error
        });
    } else {
      console.error("Token not found in local storage.");
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}</h1>
          <p>Email: {userData.email}</p>
          <img src={userData.profileUrl} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}