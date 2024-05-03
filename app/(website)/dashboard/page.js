"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

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
      console.error("Token not found in local storage. Redirecting to login...");
      router.push("/auth/login"); // Redirect to login page
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  }; 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {userData ? (
        <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-2">Welcome, {userData.name}</h1>
            <p className="text-gray-600">Email: {userData.email}</p>
            <img src={userData.profileUrl} alt="Profile Picture" className="mt-4 w-full rounded-lg" />
            <button
            onClick={handleSignOut}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
            Sign Out
          </button> 
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}