import React, {useState, useRef} from "react";

export default function MovieDatabase() {
  const [databaseResults, setDatabaseResults] = useState([]);
  const [query, setQuery] = useState("");

async function databaseFetch() {
// e.preventDefault();
    const resp = await   
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_original_language=en&page=1`
    )
    const json = await resp.json();
    console.log(json)

    const {results} = json;

    setDatabaseResults(results || []);
}

  return (
    <div className="database-result">
      <button onClick={() => databaseFetch(query)}>Get Your Screams</button>
<h2 className="database-result__header">Find a horror movie to watch</h2>

{databaseResults.length && databaseResults.map(databaseResult => {
  <div key={databaseResult}>
    <img src={`https://image.tmdb.org/t/p/original${databaseResult.poster_path}`}
        alt="Movie poster"
      />
    <h1 className="database-result__title">Title: {databaseResult.title}</h1>
    <h3 className="database-result__details">IMDB Rating {databaseResult.vote_average}</h3>
    <h3 className="database-result__details">Release Date: {databaseResult.release_date}</h3>
    <h3 className="database-result__details">Overview: {databaseResult.overview}</h3>
  </div>
})}
    </div>
  )
}

