import StockData from "../services/stockData.service.js";

class Controller {
  async getStockNames(req, res) {
    try {
      const { input } = req.body;
      const response = await StockData.fetchMatchingName(input);
      res.status(200).send(response);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default new Controller();
