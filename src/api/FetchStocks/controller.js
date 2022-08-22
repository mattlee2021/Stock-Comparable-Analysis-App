import StockData from "../services/stockData.service.js";

export class Controller {
  async getStockData(req, res) {
    try {
      const { ticker } = req.body;
      const response = await StockData.fetchStocks(ticker);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }
}

export default new Controller();
