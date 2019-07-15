import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('https://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(response => {
        // console.log('response.data.hits =>', response.data.hits);
        setResults(response.data.hits)
      });
  }, []);

  return (
    <>
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
