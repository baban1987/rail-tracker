import React from 'react';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-800 text-white shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold tracking-wider">RailTracker</h1>
          <p className="text-blue-200">Live Indian Railways Loco & Train Tracking</p>
        </nav>
      </header>
      <main className="container mx-auto p-6">
        <HomePage />
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} RailTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;