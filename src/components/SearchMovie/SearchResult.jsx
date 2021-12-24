import React, { useRef, useState } from 'react';

let debounceTimeout;

export default function SearchResult() {
  const searchInput = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  searchInput.current?.focus();

  async function searchMovies(searchQuery) {
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=f6c2597101b3b0f8d6fcff87b23eaea3&&with_genres=27`
    );
    const json = await resp.json();
    const { results } = json;

    setSearchResults(results || []);
  }

  

  return (
    <div className="search-result">
      <h2 className="search-result__header">Search for Movie by Title</h2>

      <input
        ref={searchInput}
        onChange={ev => setQuery(ev.target.value)}
        placeholder="Movie title"
        // onInput={(ev) => {
        //   clearTimeout(debounceTimeout);

        //   debounceTimeout = setTimeout(() => {
        //     searchMovies(ev.target.value);
        //   }, 250);
        // }}
      />

<button onClick={() => searchMovies(query)}>Search</button>
{searchResults.map(searchResult => (
        <div key={searchResult}>
          <h1>Title: {searchResult.title}</h1>
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
};
    