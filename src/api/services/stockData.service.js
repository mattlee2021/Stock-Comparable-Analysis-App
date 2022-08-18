import axios from "axios";
class StockData {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://www.alphavantage.co",
    });
  }

  async fetchStocks(ticker) {
    const stockData = await this.instance.get("/query", {
      params: {
        function: "OVERVIEW",
        symbol: ticker,
        apikey: "ZY9GZNYZQM8C1MQC",
      },
    });
    const result = {
      Ticker: stockData.data.Symbol,
      Name: stockData.data.Name,
      "P/E": stockData.data.PERatio,
      "P/B": stockData.data.PriceToBookRatio,
      EPS: stockData.data.EPS,
      "EV/EBITDA": stockData.data.EVToEBITDA,
      "EV/Revenue": stockData.data.EVToRevenue,
      "Profit Margin": stockData.data.ProfitMargin,
      Sector: stockData.data.Sector,
    };
    return result;
  }

  async fetchMatchingName(input) {
    const matchingNames = await this.instance.get("/query", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: input,
        apikey: "ZY9GZNYZQM8C1MQC",
      },
    });

    return matchingNames.data;
  }
}

export default new StockData();
