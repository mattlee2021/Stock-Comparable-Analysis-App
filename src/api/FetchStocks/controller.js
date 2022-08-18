import StockData from "./stockData.service.js";

export class Controller {
  async getStockData(req, res) {
    try {
      console.log("Request body", req.body);
      const { ticker } = req.body;
      const stockInformation = await StockData.fetchStocks(ticker);
      return res.status(200).json(stockInformation);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }
}

export default new Controller();
