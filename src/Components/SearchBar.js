import React, { useEffect, useState } from "react";
import "./SearchBar.scss";

const SearchBar = (props) => {
  /*
  state to store: entered text, suggested results to display, maybe the items fetched from the API 
  

  Goal: When a user enters a valid stock and hits enter, the suggested results are rendered to the page

  Ultimate Goal: As a user, I can begin typing a COMPANY NAME and a list of suggested stocks will show up below the input box.
  Sub Tasks:
    - When a user enters a valid stock and hits enter, the suggested results are rendered to the page
    - A user can click on a suggested result and will populate in the search box
    - The suggested stocks are styled nicely in a typical dropdown box 

    Current Goal: When a user enters a valid stock and hits enter, the suggested results are rendered to the page
     - Create the search bar
     - when a user begins typing, start filtering out the items
     - a user hits enter, and display the suggested results


    */

  const [suggestedResults, setSuggestedResults] = useState([]);
  const [ticker, setTicker] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onChangeTicker = (event) => {
    setTicker(() => event.target.value);
  };

  useEffect(() => {
    setSuggestedResults(() => []);
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=ZY9GZNYZQM8C1MQC`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.bestMatches) {
          console.log("Data", data);
          for (let index = 0; index < 5; index++) {
            let key = index.toString();
            // console.log("symbol", data.bestMatches[key]["1. symbol"]);
            // console.log("name", data.bestMatches[key]["2. name"]);
            if (
              data.bestMatches[key]["1. symbol"] &&
              data.bestMatches[key]["2. name"]
            ) {
              setSuggestedResults((prev) => [
                ...prev,
                [
                  data.bestMatches[key]["1. symbol"],
                  data.bestMatches[key]["2. name"],
                ],
              ]);
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //console.log(suggestedResults);
  }, [ticker]);

  console.log(suggestedResults);

  return (
    <React.Fragment>
      <input
        id="tickerInput"
        type="text"
        value={ticker}
        onChange={onChangeTicker}
        className="searchBar"
      />
      {/* <button type="submit" onClick={onSubmitHandler}>
        Search
      </button> */}
      <div className="searchResults">
        {suggestedResults.map((stock) => {
          return (
            <ul>
              Symbol: {stock[0]} Name: {stock[1]}
            </ul>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
