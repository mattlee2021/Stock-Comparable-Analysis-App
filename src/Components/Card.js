import React from "react";
import "./Card.scss";
import DeleteButton from "./DeleteButton";

const Card = (props) => {
  const stockData = props.stockData;

  return (
    <table>
      <thead>
        <tr>
          <th className="metricLabel stockNames"> Metrics </th>
          {stockData.map((stockData) => {
            return <th className="stockNames"> {stockData["Name"]} </th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="metricLabel">P/E</th>
          {stockData.map((stockData) => {
            return <td>{stockData["P/E"]}</td>;
          })}
        </tr>
        <tr>
          <th className="metricLabel">P/B</th>
          {stockData.map((stockData) => {
            return <td> {stockData["P/B"]} </td>;
          })}
        </tr>
        <tr>
          <th className="metricLabel">EV/EBITDA</th>
          {stockData.map((stockData) => {
            return <td> {stockData["EV/EBITDA"]} </td>;
          })}
        </tr>
        <tr>
          <th className="metricLabel">EV/Revenue</th>
          {stockData.map((stockData) => {
            return <td> {stockData["EV/Revenue"]} </td>;
          })}
        </tr>
        <tr>
          <th className="metricLabel">EPS</th>
          {stockData.map((stockData) => {
            return <td> {stockData["EPS"]} </td>;
          })}
        </tr>
        <tr>
          <th className="metricLabel">Profit Margin</th>
          {stockData.map((stockData) => {
            return <td> {stockData["Profit Margin"]} </td>;
          })}
        </tr>
        <tr>
          <th className="metricLabel">Sector</th>
          {stockData.map((stockData) => {
            return <td> {stockData["Sector"]} </td>;
          })}
        </tr>
        <tr>
          <td>&nbsp;</td>
          {stockData.map((ticker, index) => {
            return (
              <td>
                <DeleteButton
                  ticker={ticker}
                  stockData={stockData}
                  setStockData={props.setStockData}
                />
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Card;
