import axios from "axios";
class SimilarStocks {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://stock-data-yahoo-finance-alternative.p.rapidapi.com",
      headers: {
        "x-rapidapi-host":
          "stock-data-yahoo-finance-alternative.p.rapidapi.com",
        "x-rapidapi-key": "80ad986cb5mshcabba16d2878f8fp14dca4jsn61fd4cc10485",
      },
    });
  }

  async getSimilarStocks(ticker) {
    const response = await this.instance.get(
      `/v6/finance/recommendationsbysymbol/${ticker}`
    );
    const similarStocks = response.data.finance.result[0].recommendedSymbols;
    const similarStocksResult = similarStocks.map((stockData) => {
      return stockData.symbol;
    });
    const result = {
      status: "success",
      data: {
        similarStocksResult,
      },
    };
    return result;
  }
}

export default new SimilarStocks();
