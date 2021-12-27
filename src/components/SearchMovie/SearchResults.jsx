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
      .map((result) => ({
        ...result,
        release_date: new Date(result.release_date).toLocaleDateString()
      }));

    console.log(results);

    setSearchResults(results || []);

    if (!results.length)
      alert(
        `No results for horror movies with title "${searchQuery}." Try a different search.`
      );
  }

  return (
    <div className="search">
      <div className="search__results--ui-container">
        <h2 className="search__header">Search Your Scream</h2>

        <input
          ref={searchInput}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Movie title"
          className="search__input"
        />

        <button className="search__button" onClick={() => searchMovies(query)}>
          Search
        </button>
        {!!searchResults.length &&
          searchResults.map((searchResult) => (
            <div key={searchResult.id}>
              <div className="card">
                <div className="card__side card__side--front">
                  <img
                    src={`https://image.tmdb.org/t/p/original${searchResult.poster_path}`}
                    alt="Movie poster"
                    className="card__picture"
                  />
                  <div className="card__side card__side--back">
                    <h2 className="card__title">{searchResult.title}</h2>
                    <h3 className="card__details">
                      <strong>IMDB Rating: </strong> {searchResult.vote_average}
                    </h3>
                    <h3 className="card__details">
                      <strong>Release Date: </strong>
                      {searchResult.release_date}
                    </h3>
                    <h3 className="card__details">
                      <strong>Overview: </strong>
                      {searchResult.overview}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
