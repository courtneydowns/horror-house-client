import React, { useState, useEffect } from 'react';

import '../../sass/components/_card.scss';

export default function LoadDatabase() {
  const [databaseResults, setDatabaseResults] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_original_language=en&page=1`
      );
      const json = await response.json();
      const { results } = json;

      setDatabaseResults(results || []);
    })();
  }, []);

  return (
    <div className="database">
      {!!databaseResults.length &&
        databaseResults.map((databaseResult) => (
          <div className="card" key={databaseResult.id}>
            <div className="card-inner">
              <div
                className="card-front"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original${databaseResult.poster_path}')`
                }}
              ></div>

              <div className="card-back">
                <h1>{databaseResult.title}</h1>

                <h3>
                  <strong>IMDB Rating: </strong> {databaseResult.vote_average}
                </h3>
                <h3>
                  <strong>Release Date: </strong> {databaseResult.release_date}
                </h3>
                <h3>
                  <strong>Overview: </strong> {databaseResult.overview}
                </h3>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
