"use client";

import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { email, password });
      if (response.data.success) {
        setMessage('Signup successful!');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Email" />
          </div>
          <div className="mb-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white" placeholder="Password" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300">Sign up</button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;