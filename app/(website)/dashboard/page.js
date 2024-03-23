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
          setUserData(response.data.user); 
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    } else {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {userData ? (
        <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-semibold mb-2">Welcome, {userData.name}</h1>
            <p className="text-gray-600">Email: {userData.email}</p>
            <img src={userData.profileUrl} alt="Profile Picture" className="mt-4 w-full rounded-lg" />
          </div>
        </div>
      ) : (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500  border-t-transparent"></div>
      </div>
      )}
    </div>
  );
}