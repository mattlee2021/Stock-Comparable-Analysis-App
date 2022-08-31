import axios from "axios";
class StockApiService {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8081",
    });
  }

  async getStockData(requestedTicker) {
    const requestedTickerData = await this.instance({
      url: "/stockData",
      method: "post",
      data: {
        ticker: requestedTicker,
      },
    });
    const result = requestedTickerData.data.data.stockInformation;
    return result;
  }

  async getMatchingStockNames(userInput) {
    const suggestedStockNames = await this.instance({
      url: "/matchingStockNames",
      method: "post",
      data: {
        input: userInput,
      },
    });
    const result = suggestedStockNames.data.data.matchingStockNames;
    return result;
  }

  async getSimilarStocks(ticker) {
    const similarStocksData = await this.instance({
      url: "similarStocks",
      method: "post",
      data: {
        ticker,
      },
    });
    const similarStockTickers = similarStocksData.data.data.similarStocksResult;
    const result = await Promise.all(
      similarStockTickers.map(async (ticker) => {
        const similarStockData = await this.getStockData(ticker);
        return similarStockData;
      })
    );
    return result;
  }
}

export default new StockApiService();
