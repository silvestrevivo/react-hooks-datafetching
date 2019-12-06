import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
    // eslint-disable-next-line
  }, []);

  const getResults = async () => {
    const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
    // This can not be inside the useEffect hooks, otherwise it creates an infinite loop
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
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          ref={searchInputRef}
          onChange={event => setQuery(event.target.value)} />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
