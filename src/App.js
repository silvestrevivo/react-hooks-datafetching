import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
    // eslint-disable-next-line
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    } // This can not be inside the useEffect hooks, otherwise it creates an infinite loop
    setLoading(false);
  }

  const handleSearch = e => {
    e.preventDefault();
    getResults();
  }

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  }

  return (
    <div className="container max-w-xl mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <h1 className="text-grey-darkest text-3xl font-thin">Hooks news</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          type="text"
          value={query}
          ref={searchInputRef}
          onChange={event => setQuery(event.target.value)}
          className="border p-2 rounded"/>
        <button type="submit" className="bg-orange-500 rounded m-1 p-2 text-white">Search</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal-500 text-white p-2 rounded">Clear</button>
      </form>
      {loading ?
        (<div className="font-bold text-orange-500">Loading results...</div>)
          :
        (<ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url} className="text-indigo-400 hover:text-indigo-600">{result.title}</a>
            </li>
          ))}
        </ul>)}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}

export default App;
