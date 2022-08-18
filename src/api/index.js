// get server running
// pass the routes
// listen on a port

const express = require("express");
const app = express();

const stockDataRoute = require("./FetchStocks/stockData.service");
app.get("/stockData", stockDataRoute);

app.listen(8081);
