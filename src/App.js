import "./App.css";
import LogOnForm from "./components/LogOnForm";
import StockApi from "./api/StockApi";
import React, { useState } from "react";
import Card from "./components/Card";

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
        alert("That stock is already on your list!");
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
      <StockApi getStockData={getStockData} />
      <Card stockData={stockData} />
    </React.Fragment>
  );
}

export default App;
