import TestRenderer from "react-test-renderer";
import StockSearch from "./StockSearch";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import stockApiService from "./stockApi.service";
import "@testing-library/jest-dom";

// jest.mock("../api/FetchStocks");
// jest.mock("../api/FetchSimilarStocks");
jest.mock("./stockApi.service");

describe("StockSearch", () => {
  it("Should match the snapshot", () => {
    const testRenderer = TestRenderer.create(<StockSearch />).toJSON();
    expect(testRenderer).toMatchSnapshot();
  });

  it("Should create a new table when clicking new table button", async () => {
    const mockSetTableData = jest.fn();

    render(<StockSearch setTableData={mockSetTableData} />);

    userEvent.click(screen.getByText(/create new table/i));
    expect(mockSetTableData).toHaveBeenCalled();
  });

  it("Should add stock to the stock list", async () => {
    const mockAppleStock = {
      Ticker: "AAPL",
      Name: "Apple Inc",
      "P/E": "26.27",
      "P/B": "45.25",
      EPS: "6.05",
      "EV/EBITDA": "20.51",
      "EV/Revenue": "6.97",
      "Profit Margin": "0.257",
      Sector: "TECHNOLOGY",
    };
    stockApiService.getStockData.mockReturnValue(mockAppleStock);
    const mockGetStockData = jest.fn();
    render(<StockSearch getStockData={mockGetStockData} />);
    userEvent.click(screen.getByRole("checkbox"));
    userEvent.type(screen.getByRole("textbox"), "AAPL");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() =>
      expect(mockGetStockData).toHaveBeenCalledWith(mockAppleStock)
    );
  });

  it("Should call getSimilarStocks with the input when the flag is selected", () => {
    const mockGetStockData = jest.fn();
    render(<StockSearch getStockData={mockGetStockData} />);
    userEvent.type(screen.getByRole("textbox"), "AAPL");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(stockApiService.getSimilarStocks).toHaveBeenCalledWith("AAPL");
  });

  it("Should disable the submit button if there is no inputted text", () => {
    const mockGetStockData = jest.fn();
    render(<StockSearch getStockData={mockGetStockData} />);
    userEvent.type(screen.getByRole("textbox"), "");
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });
});
