// App.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS for global styles (adjust path as necessary)

const API_BASE_URL = 'https://dev-api-two.vercel.app'; // Replace with your Vercel app URL

function App() {
  const [repos, setRepos] = useState([]);
  const [topic, setTopic] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const fetchRepos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/github`);
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const fetchTopicRepos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/github/topic`, {
        params: { topic }
      });
      setRepos(response.data);
    } catch (error) {
      console.error(`Error fetching ${topic} repositories:`, error);
    }
  };

  const handleSearch = () => {
    if (topic.trim() !== '') {
      fetchTopicRepos();
    } else {
      fetchRepos();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`w-full h-full min-h-screen p-4 ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="flex justify-end mb-2">
        <button
          className="px-4 py-2 rounded-md mr-2 bg-blue-500 text-white hover:bg-blue-600"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">GitHub Repositories</h1>
      <div className="flex mb-4">
        <input
          className="border border-gray-300 rounded-l px-4 py-2 w-full dark:bg-gray-800 dark:text-white"
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r px-4 py-2 ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map(repo => (
          <div
            key={repo.repository_name}
            className="border border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105 bg-blue-400"
          >
            <h3 className="text-xl font-bold mb-2">{repo.repository_name}</h3>
            <p className="text-sm text-gray-600 mb-2">Author: {repo.author}</p>
            <p className="text-sm text-gray-600 mb-2">Language: {repo.language}</p>
            <p className="text-sm mb-2">{repo.description}</p>
            <p><a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Repo</a></p>
            <div className="flex items-center mt-2">
            <img
                src={repo.avatar_url}
                alt={`${repo.author}'s avatar`}
                className="rounded-full w-8 h-8 mr-2"
              />
              <p className="text-sm text-gray-600">{repo.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
