import { useState } from "react";
import "./StockSearch.scss";
const StockSearch = (props) => {
  const [ticker, setTicker] = useState("");

  const onSubmitTickerHandler = (event) => {
    event.preventDefault();
    props.getTicker(ticker);
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
    </form>
  );
};

export default StockSearch;
