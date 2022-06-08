import { useState } from "react";
import "./StockSearch.scss";
import FetchStocks from "../api/FetchStocks";
import FetchSimilarStocks from "../api/FetchSimilarStocks";
import FetchStockNames from "../api/FetchStockNames";

const StockSearch = (props) => {
  const [showSimilarStocks, setShowSimilarStocks] = useState(true);
  const [suggestedResults, setSuggestedResults] = useState([]);
  const [ticker, setTicker] = useState("");
  let searchResults;

  //API KEY is TD8ZNN64UTNOK6DA

  const addStockToList = async () => {
    const stockToAdd = await FetchStocks(ticker);
    if (stockToAdd) {
      props.getStockData(stockToAdd);
    }
  };

  const addSimilarStockToList = async () => {
    const similarStockData = await FetchSimilarStocks(ticker);
    if (similarStockData) {
      similarStockData.forEach((stockData) => {
        props.getStockData(stockData);
      });
    }
  };

  const handleSubmitTicker = async (event) => {
    event.preventDefault();
    setTicker("");
    setSuggestedResults(() => []);
    addStockToList();
    if (showSimilarStocks) {
      addSimilarStockToList();
    }
  };

  const onChangeInput = async (event) => {
    const input = event.target.value;
    setTicker(() => input);
    setSuggestedResults(() => []);
    searchResults = await FetchStockNames(input);
    if (searchResults) {
      setSuggestedResults(() => searchResults);
    }
  };

  return (
    <form>
      <div className="ticker">
        <label>Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={onChangeInput}
          className="searchBar"
        />
        <button
          type="submit"
          disabled={ticker.length === 0}
          onClick={handleSubmitTicker}
          className={ticker.length === 0 ? "disabled" : ""}
        >
          Submit
        </button>
        <div className="similarStock">
          <label> Show Similar Stocks </label>
          <input
            type="checkbox"
            checked={showSimilarStocks}
            onChange={() => {
              setShowSimilarStocks((prev) => {
                return !prev;
              });
            }}
          />
        </div>

        <button type="submit" onClick={props.handleCreateTable}>
          Create New Table
        </button>
      </div>
      <div className="searchResults">
        {suggestedResults.map((stock) => {
          return (
            <ul
              onClick={() => {
                setTicker(() => stock[0]);
                setSuggestedResults(() => []);
              }}
            >
              Symbol: {stock[0]} Name: {stock[1]}
            </ul>
          );
        })}
      </div>
    </form>
  );
};

export default StockSearch;
