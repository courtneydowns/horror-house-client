// import React, { useRef, useState } from 'react';

// let debounceTimeout;

// export default function SearchResult() {
//   const searchInput = useRef(null);
//   const [searchResult, setSearchResult] = useState([]);

//   searchInput.current?.focus();

//   async function searchMovies(searchQuery) {
//     const resp = await fetch(
//       `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=f6c2597101b3b0f8d6fcff87b23eaea3&&with_genres=27`
//     );
//     const json = await resp.json();
//     const { results } = json;

//     setSearchResult(results || []);
//   }

//   return (
//     <div className="search-result">
//       <h2 className="search-result__header">Search for Movie by Title</h2>

//       <input
//         ref={searchInput}
//         placeholder="Movie title"
//         onInput={(ev) => {
//           clearTimeout(debounceTimeout);

//           debounceTimeout = setTimeout(() => {
//             searchMovies(ev.target.value);
//           }, 250);
//         }}
//       />

// <button onClick={searchMovies}>Search</button>
// {searchResult && (
//         <div>
//           <h2>Title</h2>
//           <h2>{searchResult.title}</h2>
//           <img
//         src={`https://image.tmdb.org/t/p/original${searchResult.poster_path}`}
//         alt="Movie poster"
//       />
//           <h4>IMDB Rating</h4>
//           <h4>{searchResult.vote_average}</h4>
//           <h4>IMDb Rating</h4>
//           <h4>{searchResult.imdbRating}</h4>
//           <h4>Release Date</h4>
//           <h4>{searchResult.release_date}</h4>
//           <h4>Overview</h4>
//           <h6>{searchResult.overview}</h6>
//         </div>
//       )}
//     </div>
//   );
// };
    