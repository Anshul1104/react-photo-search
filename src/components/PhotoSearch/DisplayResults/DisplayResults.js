import React from "react";
import Loader from "../loader/loader";

import "./DisplayResults.css";

const DisplayResults = (props) => {
  let loading;

    if(props.isLoading) {
  loading = <Loader />;
    }
     else {
      loading =  props.results.map(result => (
              <div className="card" key={result.id}>
                  <img src={result.urls.regular} alt={result.alt_description} />
              </div>
          ) )
    }
  return <div className="card-list">{loading}</div>;
};

export default DisplayResults;
