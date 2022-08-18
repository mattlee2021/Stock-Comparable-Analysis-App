// get server running
// pass the routes
// listen on a port

import express from "express";
import controller from "./FetchStocks/controller.js";

//const express = require("express");
const app = express();
app.use(express.json());

app.post("/stockData", controller.getStockData);

app.get("/healthCheck", (req, res) => {
  res.send("Hello World");
});

app.listen(8081, () => {
  console.log("listening 8081");
});
