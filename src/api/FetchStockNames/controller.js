import StockData from "../services/stockData.service.js";

class Controller {
  async getStockNames(req, res) {
    try {
      const { input } = req.body;
      const matchingStocksData = await StockData.fetchMatchingName(input);
      if (matchingStocksData.bestMatches.length) {
        const matchingStocksNames = matchingStocksData.bestMatches.map(
          (stockData) => stockData["2. name"]
        );
        const response = {
          status: "success",
          data: {
            matchingStocksNames: matchingStocksNames,
          },
        };
        res.status(200).send(response);
      } else {
        const errorResponse = {
          status: "fail",
          data: { "error message": "No tickers similar to tickers " + input },
        };
        res.status(404).send(errorResponse);
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default new Controller();
