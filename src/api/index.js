import express from "express";
import cors from "cors";
import FetchStocksController from "./FetchStocks/controller.js";
import FetchStockNamesController from "./FetchStockNames/controller.js";
import FetchSimilarStocksController from "./FetchSimilarStocks/controller.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/stockData", FetchStocksController.getStockData);
app.post("/matchingStockNames", FetchStockNamesController.getStockNames);
app.post("/similarStocks", FetchSimilarStocksController.getSimilarTickers);

app.get("/healthCheck", (req, res) => {
  res.status(200).send("Server Running");
});

app.listen(8081, () => {
  console.log("Listening on Port 8081");
});
