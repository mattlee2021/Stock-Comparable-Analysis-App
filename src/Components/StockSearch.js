import { useState } from "react";
import "./StockSearch.scss";
const StockSearch = (props) => {
  const [ticker, setTicker] = useState("");
  const [showSimilarStocks, setShowSimilarStocks] = useState(false);

  const onSubmitTickerHandler = (event) => {
    event.preventDefault();
    props.getTicker(ticker);
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

export default StockSearch;
