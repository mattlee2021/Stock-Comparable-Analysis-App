import { useState } from "react";
import "./StockApi.scss";

const StockApi = (props) => {
  const [ticker, setTicker] = useState("");
  let stockData = {};
  let similarStockData = {};
  //API KEY is TD8ZNN64UTNOK6DA

  /*
  1. Enter Stock
  2. Check if stock is valid and get info
  3. Get similar stocks
  4. Fetch Stocks for all similar stocks
  5. bundle data together and send it to Card.js
  */
  const onSubmitTickerHandler = (event) => {
    event.preventDefault();

    // Handle empty case by disabling submit if there is no input
    // Now, need to handle case where there is a bad input
    fetch(
      "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
        ticker +
        "&apikey=TD8ZNN64UTNOK6DA"
    )
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
        return stockData; //
      })
      .catch((error) => {
        alert(error);
      });

    const similarStocks = fetch(
      "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/recommendationsbysymbol/" +
        ticker,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "stock-data-yahoo-finance-alternative.p.rapidapi.com",
          "x-rapidapi-key":
            "80ad986cb5mshcabba16d2878f8fp14dca4jsn61fd4cc10485",
        },
      }
    ) // ALERT POPS UP WHEN REFRESHING THE PAGE
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "No similar companies can be obtained for this stock."
          );
        }
      })
      .then((data) => {
        console.log(data.finance.result[0].recommendedSymbols);
        return data.finance.result[0].recommendedSymbols;
      })
      .catch((error) => {
        alert(error);
      });

    console.log("similar stocks,", similarStocks);
    console.log("first", similarStocks[0]);
    console.log(similarStocks.length);

    async function similarStocksFetched() {
      const data = await similarStocks;
      for (let i = 0; i < data.length; i++) {
        console.log("Elements,", data[i]);
        fetch(
          "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
            data[i].symbol +
            "&apikey=TD8ZNN64UTNOK6DA"
        )
          .then((response) => {
            return response.json();
          })
          .then((similarStock) => {
            console.log("Fetched Data from AlphaVantage,", similarStock);
            similarStockData = {
              Ticker: similarStock.Symbol,
              Name: similarStock.Name,
              "P/E": similarStock.PERatio,
              EPS: similarStock.EPS,
              "P/B": similarStock.PriceToBookRatio,
              "Profit Margin": similarStock.ProfitMargin,
              Sector: similarStock.Sector,
            };
            console.log(similarStockData);
            props.getStockData(similarStockData);
          });
      }
    }

    similarStocksFetched();
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
