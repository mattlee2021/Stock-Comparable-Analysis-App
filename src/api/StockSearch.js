import { useState } from "react";
import "./StockSearch.scss";
import FetchStocks from "./FetchStocks";
import FetchSimilarStocks from "./FetchSimilarStocks";

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
      <label> Ticker</label>
      <input
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
      </button>
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
    </form>
  );
};

export default StockApi;
