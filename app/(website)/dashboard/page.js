// app/dashboard/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await axios.get('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {userData ? (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="flex justify-center mb-4">
            <img
              src={userData.profileUrl}
              alt="Profile"
              className="rounded-full w-24 h-24"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
} 