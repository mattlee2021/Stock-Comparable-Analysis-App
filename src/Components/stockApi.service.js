import axios from "axios";
class StockApiService {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8081",
    });
  }

  async getStockData(requestedTicker) {
    console.log("requestedTicker", requestedTicker);
    const requestedTickerData = this.instance({
      url: "/stockData",
      method: "post",
      data: {
        ticker: requestedTicker,
      },
    });
    return requestedTickerData;
  }
}

export default new StockApiService();
