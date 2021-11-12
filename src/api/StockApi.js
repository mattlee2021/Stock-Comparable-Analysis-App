import { useState } from "react";
import "./StockApi.scss";

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
        console.log("Got a response,", response);
        if (response) {
          console.log("Sending a response");
          return response.json();
        } else {
          console.log("Reached rate limit");
          throw new Error("Error here!!");
        }
      })
      .then((data) => {
        console.log("New Data,", data);
        if (data.Name === undefined && data.Note !== undefined) {
          setTicker("");
          throw new Error(
            "You hit the rate limit of 5 stock requests per minute. Please wait another minute before adding new stocks."
          );
        } else if (data.Name === undefined) {
          setTicker("");
          throw new Error("Invalid Ticker");
        }
        stockData = {
          Ticker: ticker.toUpperCase(),
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
        alert(error);
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
        className={ticker.length === 0 ? "disabled" : ""}
      >
        Submit
      </button>
    </form>
  );
};

export default StockApi;
