import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [APIData, setAPIData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/todos`).then((response) => {
      setAPIData(response.data);
    });
  }, []);
  console.log(APIData);

  return (
    <div style={{ marginTop: 20 }}>
      <input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      {searchInput.length > 1
        ? filteredResults.map((item) => {
            return (
              <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            );
          })
        : APIData.map((item) => {
            return (
              <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            );
          })}
    </div>
  );
};

export default Search;
