import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reactHooks')

  useEffect(() => {
    getResults();
    // eslint-disable-next-line
  }, [query]); //this hook is working with mounting component and with query changes

  const getResults = async () => {
    const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
    // This can not be inside the useEffect hooks.
  }

  return (
    <>
      <input type="text" onChange={event => setQuery(event.target.value)} />
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
