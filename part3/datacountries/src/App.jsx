import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import Search from "./components/search";
import ShowCountries from "./components/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFilterd] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  let display = newFilter !== "" ? filtered : [];

  const handleSearch = event => {
    setNewFilter(event.target.value);
    let data = countries.filter(elem => {
      let re = new RegExp(`${newFilter}`, "gi");
      return elem.name.match(re);
    });
    setFilterd(data);
  };

  let states =
    filtered.length <= 10
      ? display.map((state, i) => <p key={i}>{state.name}</p>)
      : "Too many matches, specify another filter ";
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      let data = res.data;
      setCountries(data);
    });
  }, []);
  return (
    <Fragment>
      <h2> Phonebook </h2>
      <Search search={handleSearch} value={newFilter} />
      <ShowCountries countries={states} />
    </Fragment>
  );
};

export default App;
