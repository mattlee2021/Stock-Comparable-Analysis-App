import TestRenderer from "react-test-renderer";
import StockSearch from "./StockSearch";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FetchStocks from "../api/FetchStocks";
import "@testing-library/jest-dom";
import FetchSimilarStocks from "../api/FetchSimilarStocks";

jest.mock("../api/FetchStocks");
jest.mock("../api/FetchSimilarStocks");

describe("StockSearch", () => {
  it("Should match the snapshot", () => {
    const testRenderer = TestRenderer.create(<StockSearch />).toJSON();
    expect(testRenderer).toMatchSnapshot();
  });

  it("Should add stock to the stock list", () => {
    const mockGetStockData = jest.fn();
    render(<StockSearch getStockData={mockGetStockData} />);
    userEvent.click(screen.getByRole("checkbox"));
    userEvent.type(screen.getByRole("textbox"), "AAPL");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(FetchStocks).toHaveBeenCalledWith("AAPL");
  });

  it("Should call FetchSimilarStocks with the input when the flag is selected", () => {
    const mockGetStockData = jest.fn();
    render(<StockSearch getStockData={mockGetStockData} />);
    userEvent.type(screen.getByRole("textbox"), "AAPL");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(FetchSimilarStocks).toHaveBeenCalledWith("AAPL");
  });

  it("Should disable the submit button if there is no inputted text", () => {
    const mockGetStockData = jest.fn();
    render(<StockSearch getStockData={mockGetStockData} />);
    userEvent.type(screen.getByRole("textbox"), "");
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });
});
