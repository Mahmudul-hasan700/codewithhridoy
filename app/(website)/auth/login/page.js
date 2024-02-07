"use client";
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        setMessage('Login successful!');
      } else {
        setMessage('User not found. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-6 xl:px-40">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mb-2 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:invalid:border-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white`}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mb-2 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:invalid:border-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white`}
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </div>
        {message && <p className="text-red-500 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Login;