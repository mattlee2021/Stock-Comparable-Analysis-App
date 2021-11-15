import "./App.css";
import LogOnForm from "./components/LogOnForm";
import StockApi from "./api/StockApi";
import React, { useState } from "react";
import Card from "./components/Card";
import SimilarStockApi from "./api/SimilarStockApi";

function App() {
  // const [singleStock, setSingleStock] = useState("");
  // const getStockData = (data) => {
  //   setSingleStock(data);
  //   console.log(data, singleStock);
  // };

  const [stockData, setStockData] = useState([]);

  //BUG with two consecutive adds
  const getStockData = (newStock) => {
    console.log(stockData);
    for (const index in stockData) {
      if (newStock.Ticker === stockData[index].Ticker) {
        alert(newStock.Ticker + " is already on your list!");
        return;
      }
    }
    setStockData((prev) => {
      console.log("Prev", prev);
      return [...prev, newStock];
    });
  };
  return (
    <React.Fragment>
      {/* <SimilarStockApi /> */}
      <StockApi getStockData={getStockData} />
      <Card stockData={stockData} />
    </React.Fragment>
  );
}

export default App;
