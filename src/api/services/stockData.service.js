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
    console.log("stockData", stockData);
    if (stockData.data.Symbol) {
      const stockInformation = {
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

      const result = {
        status: "success",
        data: {
          stockInformation,
        },
      };

      return result;
    } else {
      const errorResponse = {
        status: "fail",
        data: { "error message": "No avaliable data for " + ticker },
      };
      return errorResponse;
    }
  }

  async fetchMatchingName(input) {
    const matchingNamesData = await this.instance.get("/query", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: input,
        apikey: "ZY9GZNYZQM8C1MQC",
      },
    });
    if (matchingNamesData.data.bestMatches.length) {
      const matchingStockNames = matchingNamesData.data.bestMatches.map(
        (stockData) => stockData["2. name"]
      );
      const response = {
        status: "success",
        data: {
          matchingStockNames,
        },
      };
      return response;
    } else {
      const errorResponse = {
        status: "fail",
        data: { "error message": "No tickers similar to tickers " + input },
      };
      return errorResponse;
    }
  }
}

export default new StockData();
