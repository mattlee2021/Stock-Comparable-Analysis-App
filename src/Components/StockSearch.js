import { useState } from "react";
import "./StockSearch.scss";
import FetchStocks from "../api/FetchStocks";
import FetchSimilarStocks from "../api/FetchSimilarStocks";
import SearchBar from "./SearchBar";

const StockApi = (props) => {
  const [showSimilarStocks, setShowSimilarStocks] = useState(false);
  const [ticker, setTicker] = useState("");

  console.log("Ticker StockApi", ticker);

  //API KEY is TD8ZNN64UTNOK6DA

  // Handle empty case by disabling submit if there is no input
  // Now, need to handle case where there is a bad input

  const onSubmitTickerHandler = (event) => {
    event.preventDefault();
    FetchStocks(ticker, props.getStockData);
    if (showSimilarStocks) {
      FetchSimilarStocks(ticker, props.getStockData);
    }
    setTicker("");
  };

  return (
    <form>
      <div className="ticker">
        <label>Company</label>
        {/* <input
          id="tickerInput"
          type="text"
          value={ticker}
          onChange={(event) => {
            setTicker(event.target.value);
          }}
        />
        <button
          type="submit"
          disabled={ticker.length === 0}
          onClick={onSubmitTickerHandler}
          className={ticker.length === 0 ? "disabled" : ""}
        >
          Submit
        </button> */}
        <SearchBar />
      </div>
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
    </form>
  );
};

export default StockApi;
