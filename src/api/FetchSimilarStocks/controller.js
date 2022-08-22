import SimilarStocks from "./similarTickers.service.js";

class Controller {
  async getSimilarTickers(req, res) {
    try {
      const { ticker } = req.body;
      const similarTickersRawData = await SimilarStocks.getSimilarStocks(
        ticker
      );
      const similarTickersFiltered = similarTickersRawData.map(
        (similarTickerData) => similarTickerData.symbol
      );
      console.log(similarTickersFiltered);
      const response = {
        status: "success",
        data: {
          similarTickers: similarTickersFiltered,
        },
      };
      res.status(200).send(response);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

export default new Controller();
