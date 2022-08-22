import StockData from "../services/stockData.service.js";

export class Controller {
  async getStockData(req, res) {
    try {
      const { ticker } = req.body;
      const stockInformation = await StockData.fetchStocks(ticker);
      if (stockInformation.Ticker) {
        const response = {
          status: "success",
          data: {
            stockInformation: stockInformation,
          },
        };
        return res.status(200).json(response);
      } else {
        const errorResponse = {
          status: "fail",
          data: { "error message": "No avaliable data for " + ticker },
        };
        res.status(404).send(errorResponse);
      }
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }
}

export default new Controller();
