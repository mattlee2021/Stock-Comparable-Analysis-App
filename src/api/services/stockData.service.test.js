import mockAxios from "axios";
import axios from "axios";
import stockDataService from "./stockData.service";

//jest.mock("axios");

// jest.mock("axios", () => {
//   return {
//     default: {
//       create: jest.fn(),
//     },
//   };
// });

// Object.defineProperty(stockDataService, "instance", {
//   get: jest.fn(),
//   //set: jest.fn(),
// });

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

stockDataService.instance = {
  get: jest.fn().mockReturnValue(mockStockData),
  //set: jest.fn(),
};
console.log("INSTANCE", stockDataService.instance);

describe("stockData service", () => {
  it("Should fetch stocks when passed a valid ticker", async () => {
    //mockAxios.get.mockImplementation(() => {});
    //axios.mockReturnValue(mockStockData);
    // axios.create.mockReturnValue(() => {
    //   return { get: jest.fn(), post: jest.fn() };
    // });
    //axios.create.mockReturnValue({ get: jest.fn(), post: jest.fn() });

    const mockResponse = await stockDataService.fetchStocks("NFLX");
    expect(mockResponse).toEqual(mockStockData);
  });
});
