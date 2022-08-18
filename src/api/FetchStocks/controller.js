import FetchStocks from "./stockData.service";

export class Controller {
  async getStockData(req, res) {
    try {
      const { ticker } = req.body;
      const stockInformation = await FetchStocks(ticker);
      return res.status(200).json(stockInformation);
    } catch (error) {
      console.log(error);
      res.status(404).send(Error("Error getting stock data"));
    }
  }
}

export default new Controller();
