import React, { useRef } from 'react';
import { getSearchResults } from '../http/searchService';

export function Search({ onSearch, onEmpty }) {
  const inputRef = useRef(null);

  return (
    <div role="search">
      <input
        ref={inputRef}
        type="search"
        className="search"
        aria-label="Escribe aquí para buscar"
        placeholder="Escribe para buscar..."
        onChange={(e) => onEmpty(e.target.value)}
      />
      <button
        className="form"
        id="search"
        onClick={() => {
          if (inputRef.current.value !== '') {
            const searchQuery = `?search=${inputRef.current.value}`;
            getResults(searchQuery, onSearch);
          } else {
            onSearch(undefined);
          }
        }}
      >
        Buscar
      </button>
    </div>
  );
}

function getResults(searchQuery, onCompleted) {
  return getSearchResults(searchQuery).then((response) =>
    onCompleted(response.data)
  );
}
