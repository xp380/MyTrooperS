import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";
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

  return (
    <div>
      <input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
        className="inputSearch"
      />
      {searchInput.length > 1
        ? filteredResults.map((item) => {
            return (
              <div>
                <Card
                  title={item.title}
                  style={{
                    width: 300,
                    marginLeft: 100,
                    marginTop: 100,
                  }}
                >
                  <p>{item.description}</p>
                  <p style={{ textAlign: "center" }}>{item.statut}</p>
                </Card>
              </div>
            );
          })
        : APIData.map((item) => {
            return (
              <Card
                title={item.title}
                style={{
                  width: 300,
                  marginLeft: 100,
                  marginTop: 100,
                }}
              >
                <p>{item.description}</p>
                <p style={{ textAlign: "center" }}>{item.statut}</p>
              </Card>
            );
          })}
    </div>
  );
};

export default Search;
