// get server running
// pass the routes
// listen on a port

import express from "express";
import FetchStocksController from "./FetchStocks/controller.js";
import FetchStockNamesController from "./FetchStockNames/controller.js";
import FetchSimilarStocksController from "./FetchSimilarStocks/controller.js";

//const express = require("express");
const app = express();
app.use(express.json());

app.post("/stockData", FetchStocksController.getStockData);
app.post("/matchingStockNames", FetchStockNamesController.getStockNames);
app.post("/similarStocks", FetchSimilarStocksController.getSimilarTickers);

app.get("/healthCheck", (req, res) => {
  res.send("Hello World");
});

app.listen(8081, () => {
  console.log("listening 8081");
});
