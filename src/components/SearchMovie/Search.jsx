// import React, {useRef, useState} from "react";

// import SearchResult from "./SearchResult";

// let debounceTimeout;

// export default function Search() {
//     const searchInput = useRef(null);
//     const [searchResults, setSearchResults] = useState([]);

//     searchInput.current?.focus();

//     async function searchMovies(searchQuery) {
//         const resp = await fetch(
//             `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=f6c2597101b3b0f8d6fcff87b23eaea3&&with_genres=27`
//         );
//         const json = await resp.json();
//         const {results} = json;

//         setSearchResults(results || []);
//     }

//     return(
//         <div className="search">
//             <h2 className="search__page-title">Search Your Scream</h2>

//             <input
//             ref={searchInput}
//             placeholder="Movie title"
//             onInput={(ev) => {
//                 clearTimeout(debounceTimeout);

//                 debounceTimeout = setTimeout(() => {
//                     searchMovies(ev.target.value);
//                 }, 250)
//             }}
//             />

// {!!searchResults.length && 
// searchResults.map((searchResult, i) => (
//     <SearchResult searchResult={searchResult} />
// ))}

//         </div>
//     )
// }