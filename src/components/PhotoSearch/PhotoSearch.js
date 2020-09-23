import React, { useState, useReducer } from "react";
import Unsplash, { toJson } from "unsplash-js";
import DisplayResults from "./DisplayResults/DisplayResults";

import "./PhotoSearch.css";

const httpReducer = (state, action) => {
  switch(action.type) {
    case 'SEND_REQUEST':
      return { isLoading: true, isPagination: true }
    case 'RESPONSE':
      return { isLoading: false, isPagination: false }
    default: 
    throw new Error('Should not be reached')
  }
};

const PhotoSearch = () => {

  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    isPagination: true
  });


  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isPagination, setIsPagination] = useState(true);

  const unsplash = new Unsplash({
    accessKey: "riCuCNIUY8s3s1mRc9qynuOvi7pOHMxc6AkVhHyA-nM",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatchHttp({type: 'SEND_REQUEST'});
    console.log("clicked", query);
    unsplash.search
      .photos(query, 1, 30)
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        dispatchHttp({type: 'RESPONSE'});
      });
  };

  const squarish = () => {
    dispatchHttp({type: 'SEND_REQUEST'});
    unsplash.search
      .photos(query, 1, 30, { orientation: "squarish" })
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        dispatchHttp({type: 'RESPONSE'});
      });
  };

  const portrait = () => {
    dispatchHttp({type: 'SEND_REQUEST'});
    unsplash.search
      .photos(query, 1, 30, { orientation: "portrait" })
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        dispatchHttp({type: 'RESPONSE'});
      });
  };

  const previousPageHandler = () => {
    if (page <= 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
    dispatchHttp({type: 'SEND_REQUEST'});
    unsplash.search
      .photos(query, page, 30)
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        dispatchHttp({type: 'RESPONSE'});
      });
  };

  const nextPageHandler = () => {
    dispatchHttp({type: 'SEND_REQUEST'});
    setPage(page + 1);
    unsplash.search
      .photos(query, page, 30)
      .then(toJson)
      .then((response) => {
        console.log("response", response);
        setResults(response.results);
        dispatchHttp({type: 'RESPONSE'});
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

      <DisplayResults results={results} isLoading={httpState.isLoading} />
      {httpState.isPagination ? null : (
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
