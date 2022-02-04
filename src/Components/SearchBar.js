import React, { useEffect, useState } from "react";

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

  //Fake items for BA
  const items = {
    bestMatches: [
      {
        symbol: "BA",
        name: "Boeing Company",
        type: "Equity",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "1.0000",
      },
      {
        symbol: "BAB",
        name: "INVESCO TAXABLE MUNICIPAL BOND ETF ",
        type: "ETF",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "0.8000",
      },
      {
        symbol: "BA.LON",
        name: "BAE Systems plc",
        type: "Equity",
        region: "United Kingdom",
        marketOpen: "08:00",
        marketClose: "16:30",
        timezone: "UTC+00",
        currency: "GBX",
        matchScore: "0.6667",
      },
      {
        symbol: "BABA",
        name: "Alibaba Group Holding Ltd",
        type: "Equity",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "0.6667",
      },
      {
        symbol: "BA3.FRK",
        name: "Brooks Automation Inc",
        type: "Equity",
        region: "Frankfurt",
        marketOpen: "08:00",
        marketClose: "20:00",
        timezone: "UTC+01",
        currency: "EUR",
        matchScore: "0.5714",
      },
      {
        symbol: "BAAPX",
        name: "BlackRock Aggressive GwthPrprdPtfInvstrA",
        type: "Mutual Fund",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "0.5714",
      },
    ],
  };
  const [suggestedResults, setSuggestedResults] = useState([]);
  const [ticker, setTicker] = useState([]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onChangeTicker = (event) => {
    setTicker(() => event.target.value);
    // Do filtering logic here; regex
    //RegExp(`^${ticker}`, i)
  };

  useEffect(() => {
    /**
     * Call API here
     * When a user types, it will call the api
     * take the top 5 results and put them in the suggestedResults array
     * Is the API case sensitive?
     */
  }, [ticker]);

  return (
    <React.Fragment>
      <input
        id="tickerInput"
        type="text"
        value={ticker}
        onChange={onChangeTicker}
      />
      <button type="submit" onClick={onSubmitHandler}>
        Search
      </button>
    </React.Fragment>
  );
};

export default SearchBar;
