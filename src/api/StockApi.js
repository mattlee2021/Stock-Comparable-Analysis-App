import { useState } from "react";
import "./StockApi.scss";
import useStockApi from "../hooks/useStockApi";
import useSimilarStockApi from "../hooks/useSimilarStockApi";
import StockSearch from "../components/StockSearch";

const StockApi = (props) => {
  const [showSimilarStocks, setShowSimilarStocks] = useState(false);
  let similarStockData = {};

  // const { similarStocks, useSimilarStocksFetch } = useSimilarStockApi();

  const ticker = props.ticker;
  console.log("Ticker StockApi", ticker);

  //API KEY is TD8ZNN64UTNOK6DA

  // Handle empty case by disabling submit if there is no input
  // Now, need to handle case where there is a bad input

  if (ticker.length !== 0) {
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
          throw new Error(
            "You hit the rate limit of 5 stock requests per minute. Please wait another minute before adding new stocks."
          );
        } else if (data.Name === undefined) {
          throw new Error("Invalid Ticker");
        }
        let stockData = {
          Ticker: ticker.toUpperCase(),
          Name: data.Name,
          "P/E": data.PERatio,
          EPS: data.EPS,
          "P/B": data.PriceToBookRatio,
          "Profit Margin": data.ProfitMargin,
          Sector: data.Sector,
        };
        props.getStockData(stockData, false);

        return stockData;
      })
      .catch((error) => {
        alert(error);
      });
  }

  // const similarStocks = fetch(
  //   "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/recommendationsbysymbol/" +
  //     ticker,
  //   {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host":
  //         "stock-data-yahoo-finance-alternative.p.rapidapi.com",
  //       "x-rapidapi-key": "80ad986cb5mshcabba16d2878f8fp14dca4jsn61fd4cc10485",
  //     },
  //   }
  // ) // ALERT POPS UP WHEN REFRESHING THE PAGE
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error("No similar companies can be obtained for this stock.");
  //     }
  //   })
  //   .then((data) => {
  //     return data.finance.result[0].recommendedSymbols;
  //   })
  //   .catch((error) => {
  //     alert(error);
  //   });

  // async function similarStocksFetched() {
  //   const data = await similarStocks;
  //   console.log("NEW DATA", similarStocks);
  //   for (let i = 0; i < data.length; i++) {
  //     console.log("Elements,", data[i]);
  //   }
  // }
  // if (showSimilarStocks) {
  //   similarStocksFetched();
  // }

  return <> Hi </>;
};

export default StockApi;
