import React from "react";

const Search = ({ search }) => (
  <p>
    filter shown with
    <input type="search" onChange={search} />
  </p>
);

export default Search;
