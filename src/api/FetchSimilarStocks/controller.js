import SimilarStocks from "./similarTickers.service.js";

class Controller {
  async getSimilarTickers(req, res) {
    try {
      const { ticker } = req.body;
      const response = await SimilarStocks.getSimilarStocks(ticker);
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = {
        status: "fail",
        data: { "error message": "No similar stocks found" },
      };
      res.status(404).send(errorResponse);
    }
  }
}

export default new Controller();
