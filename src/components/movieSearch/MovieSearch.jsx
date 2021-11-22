import React, { useState, useEffect } from "react";

const MovieSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieSearchResults, setMovieSearchResults] = useState("");
  const [imdbID, setImdbID] = useState("");
  //   const [reviewData, setReviewData] = useState("");
  //   const [review, setReview] = useState("");

  const handleFetch = () => {
    fetch(
      `https://www.omdbapi.com/?apikey=dde3f76d&t=${searchTerm}&plot=full/`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        movieSearchResults(jsonData);
      })
      .catch((error) => {
        console.log("Error", error);
        alert("Something went wrong. Please try again.");
        return;
      });
  };

  return (
    <div>
      <input
        placeholder="Search for Movie Here"
        onInput={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleFetch()}>Search</button>
      {movieSearchResults && (
        <div>
          <img src={movieSearchResults.Posters} alt="movie poster" />
          <h2>Title</h2>
          <h6>{movieSearchResults.Title}</h6>
          <h4>Plot</h4>
          <h6>{movieSearchResults.Plot}</h6>
          <h4>IMDb Rating</h4>
          <h6>{movieSearchResults.imdbRating}</h6>
          <h4>Released</h4>
          <h6>{movieSearchResults.Runtime}</h6>
          <h4>Director</h4>
          <h6>{movieSearchResults.Director}</h6>
          <h4>Actors</h4>
          <h6>{movieSearchResults.Actors}</h6>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
