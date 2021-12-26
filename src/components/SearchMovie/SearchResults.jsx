import React, { useEffect, useRef, useState } from 'react';

import './SearchResults.scss';

export default function SearchResult() {
  const searchInput = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  async function searchMovies(searchQuery) {
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=f6c2597101b3b0f8d6fcff87b23eaea3&with_genres=27`
    );
    const json = await resp.json();
    let { results } = json;

    results = results
      .filter((result) => result.genre_ids.includes(27))
      .map((result) => new Date(result.release_date).toLocaleDateString());

    setSearchResults(results || []);

    if (!results.length)
      alert(
        `No results for horror movies with title "${searchQuery}." Try a different search.`
      );
  }

  return (
    <div className="search-results">
      <div className="search-results__ui-container">
        <h2 className="search-results__header">Search Your Scream</h2>

        <input
          ref={searchInput}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Movie title"
        />

        <button onClick={() => searchMovies(query)}>Search</button>
      </div>

      {!!searchResults.length &&
        searchResults.map((searchResult) => (
          <div className="search-result" key={searchResult.id}>
            <h2 className="search-result__title">{searchResult.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/original${searchResult.poster_path}`}
              alt="Movie poster"
            />
            <h3>IMDB Rating: {searchResult.vote_average}</h3>
            <h3>Release Date: {searchResult.release_date}</h3>
            <h4>Overview: {searchResult.overview}</h4>
          </div>
        ))}
    </div>
  );
}
