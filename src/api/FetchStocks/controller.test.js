import stockDataService from "../services/stockData.service";
import FetchStocksController from "./controller.js";

describe("FetchStocks Controller", () => {
  const mockStockData = {
    status: "success",
    data: {
      stockInformation: {
        Ticker: "NFLX",
        Name: "Netflix Inc",
        "P/E": "23.51",
        "P/B": "6.29",
        EPS: "12.73",
        "EV/EBITDA": "6.64",
        "EV/Revenue": "4.349",
        "Profit Margin": "0.16",
        Sector: "TRADE & SERVICES",
      },
    },
  };

  //jest.mock("FetchStocksController");

  it("Should respond with data on success", () => {});
});
