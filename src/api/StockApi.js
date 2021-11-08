import { useState } from "react";

const StockApi = (props) => {
  const [ticker, setTicker] = useState("");
  let stockData = {};
  //API KEY is TD8ZNN64UTNOK6DA

  const onSubmitTickerHandler = (event) => {
    event.preventDefault();
    const stockAPI =
      "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
      ticker +
      "&apikey=TD8ZNN64UTNOK6DA";
    // Handle empty case by disabling submit if there is no input
    // Now, need to handle case where there is a bad input
    fetch(stockAPI) // NAME, PERATIO, EPS, SECTOR, PriceToBookRatio, ProfitMargin
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (Object.keys(data).length === 0) {
          throw new Error("Invalid Ticker");
        }
        stockData = {
          Ticker: ticker,
          Name: data.Name,
          "P/E": data.PERatio,
          EPS: data.EPS,
          "P/B": data.PriceToBookRatio,
          "Profit Margin": data.ProfitMargin,
          Sector: data.Sector,
        };
        props.getStockData(stockData);
        setTicker("");
      })
      .catch((error) => {
        console.log(error);
      });
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
      >
        Submit
      </button>
    </form>
  );
};

export default StockApi;
