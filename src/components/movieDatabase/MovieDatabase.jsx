import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";

export default function LoadDatabase() {
  const [databaseResults, setDatabaseResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/discover/movie?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_original_language=en&page=1`,
  )

  const fetchDatabase = useCallback(
    async () => {
      setIsError(false)
      setIsLoading(true);

      try {
        const result = await axios(url);
        setDatabaseResults(result.databaseResults)
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    },
    [url],
  );

  useEffect(() => {
    fetchDatabase();
  }, [url, fetchDatabase]);

  return [{ databaseResults, isLoading, isError}, setUrl, fetchDatabase];
}

// import React, {useState, useEffect} from "react";

// export default function LoadDatabase() {
//   const [databaseResults, setDatabaseResults] = useState([]);

//   async function fetchDatabase() {
//     const response = await fetch (`https://api.themoviedb.org/3/discover/movie?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_original_language=en&page=1`);
//     const json = await response.json();
// const { results } = json;

//     setDatabaseResults(results || []);
//   }

//   function handleClick() {
//     fetchDatabase();
//   }


//   return (
//     <div className="database-result">
//       <button onClick={handleClick}>Get Your Screams</button>
//         {databaseResults.map(databaseResult => (
//           <div key={databaseResult}>
//             <img src={`https://image.tmdb.org/t/p/original${databaseResult.poster_path}`}
//                 alt="Movie poster"
//               />
//             <h1 className="database-result__title">Title: {databaseResult.title}</h1>
//             <h3 className="database-result__details">IMDB Rating {databaseResult.vote_average}</h3>
//             <h3 className="database-result__details">Release Date: {databaseResult.release_date}</h3>
//             <h3 className="database-result__details">Overview: {databaseResult.overview}</h3>
//           </div>
//         ))}
//       </div>
//   )
//       }