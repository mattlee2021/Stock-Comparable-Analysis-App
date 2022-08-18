import FetchStockNames from "./stockNames.service";

class Controller {
  async getStockNames(req, res) {
    try {
      const { input } = req.body;
      const response = await FetchStockNames(input);
      res.status(200).send(response);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default new Controller();
