import React, { useState } from 'react';
import axios from 'axios';

// Component for a single search form
const SearchForm = ({ title, placeholder, inputType = 'number', onSearch }) => {
    const [query, setQuery] = useState('');
    const [date, setDate] = useState(''); // Only for train search

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query) return;
        onSearch(query, date);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type={inputType}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
                {title.includes('Train') && (
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

// Main page component
const HomePage = () => {
    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (type, query) => {
        setLoading(true);
        setError('');
        setSearchResult(null);

       const url = `/api/${type}/${query}`;


        try {
            const response = await axios.get(url);
            setSearchResult(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // Note: The date for train search isn't used in the backend yet,
    // but the UI is ready for when you implement the schedule API call.

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SearchForm
                    title="Search by Loco Number"
                    placeholder="Enter 5-digit loco number..."
                    onSearch={(query) => handleSearch('loco', query)}
                />
                <SearchForm
                    title="Search by Train Number"
                    placeholder="Enter 5-digit train number..."
                    onSearch={(query, date) => handleSearch('train', query)}
                />
            </div>

            <div className="mt-8">
                {loading && <p className="text-center text-blue-600">Loading...</p>}
                {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
                {searchResult && (
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4 text-blue-800">Tracking Result</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                            <p><strong>Loco No:</strong> {searchResult.loco_no}</p>
                            {searchResult.train_no && <p><strong>Assigned Train:</strong> {searchResult.train_no}</p>}
                            <p><strong>Speed:</strong> {searchResult.speed} KMPH</p>
                            <p><strong>Last Event:</strong> {searchResult.event}</p>
                            <p><strong>Last Station:</strong> {searchResult.station}</p>
                            <p><strong>Last Updated:</strong> {new Date(searchResult.timestamp).toLocaleString()}</p>
                            <p className="md:col-span-2"><strong>Location:</strong> {searchResult.latitude}, {searchResult.longitude}</p>
                        </div>
                        {/* You can add the Leaflet map component here later */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
