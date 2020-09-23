import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import DisplayResults from "./DisplayResults/DisplayResults";

import "./PhotoSearch.css";

const PhotoSearch = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPagination, setIsPagination] = useState(true);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const unsplash = new Unsplash({
    accessKey: "YOUR_ACCESS_KEY",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsPagination(true);
    console.log("clicked", query);
    unsplash.search
      .photos(query, 1, 30)
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        setIsPagination(false);
        setIsLoading(false);
      });
  };

  const squarish = () => {
    setIsLoading(true);
    setIsPagination(true);
    unsplash.search
      .photos(query, 1, 30, { orientation: "squarish" })
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        setIsPagination(false);
        setIsLoading(false);
      });
  };

  const portrait = () => {
    setIsLoading(true);
    setIsPagination(true);
    unsplash.search
      .photos(query, 1, 30, { orientation: "portrait" })
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        setIsPagination(false);
        setIsLoading(false);
      });
  };

  const previousPageHandler = () => {
    setIsLoading(true);
    if (page < 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
    setIsPagination(true);
    unsplash.search
      .photos(query, page, 30)
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        setIsLoading(false);
        setIsPagination(false);
      });
  };

  const nextPageHandler = () => {
    setIsLoading(true);
    setIsPagination(true);
    setPage(page + 1);
    unsplash.search
      .photos(query, page, 30)
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        setIsLoading(false);
        setIsPagination(false);
      });
  };

  return (
    <div className="container">
      <h1>React Photo Search</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="search">
          <span role="img" aria-labelledby="camera-img">
            📷
          </span>
        </label>
        <input
          type="text"
          name="search"
          value={query}
          placeholder="Try cat or apple"
          onChange={(event) => setQuery(event.target.value)}
          required
        />
        <button className="btn">Search</button>
      </form>
      <div className="orientation-btns">
        Filter:
        <button onClick={squarish} className="btn btn-sm">
          Square
        </button>
        <button onClick={portrait} className="btn btn-sm">
          Portrait
        </button>
      </div>

      <DisplayResults results={results} isLoading={isLoading} />
      {isPagination ? null : (
        <div className="pagination">
          <button
            onClick={previousPageHandler}
            className="btn btn-sm"
            disabled={page === 1 ? true : false}
          >
            Previous
          </button>
          <button onClick={nextPageHandler} className="btn btn-sm">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoSearch;
