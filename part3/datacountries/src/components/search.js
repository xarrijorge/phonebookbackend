import React from "react";

const Search = ({ search, value }) => (
  <p>
    find countries
    <input onChange={search} value={value} />
  </p>
);

export default Search;
