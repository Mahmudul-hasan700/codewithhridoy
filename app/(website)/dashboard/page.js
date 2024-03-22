// pages/dashboard.js

import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <aside className="w-64 bg-gray-800">
        <div className="flex items-center justify-center h-20 text-white text-xl font-semibold">Dashboard</div>
        <nav className="mt-5">
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
        <p className="mt-4">This is a simple dashboard page built with Next.js and Tailwind CSS.</p>
      </main>
    </div>
  );
};

export default Dashboard;