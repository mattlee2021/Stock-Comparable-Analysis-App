import React, { useEffect } from "react";
import "./Card.scss";
import DeleteButton from "./DeleteButton";

const Card = (props) => {
  const stockData = props.stockData;
  useEffect(() => {
    console.log("Use Effect,", stockData);
  }, [stockData]);

  return (
    <table>
      <thead>
        <tr>
          {stockData.map((ticker, index) => {
            // delete via index value
            return (
              <th key={index}>
                <DeleteButton
                  index={index}
                  stockData={stockData}
                  onStockChange={props.onStockChange}
                />
              </th>
            );
          })}
        </tr>
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
            return <td className="sector"> {stockData["Sector"]} </td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Card;
