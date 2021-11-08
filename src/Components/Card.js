import React, { useEffect } from "react";
import "./Card.css";

const Card = (props) => {
  const stockData = props.stockData;
  console.log(typeof stockData);
  useEffect(() => {
    console.log("Use Effect,", stockData);
  }, [stockData]);

  return (
    <table>
      <thead>
        <tr className="stockNames">
          {stockData.map((stockData) => {
            return <th> {stockData["Name"]} </th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="metricLabel">P/E</th>
          {stockData.map((stockData) => {
            return <td> {stockData["P/E"]} </td>;
          })}
        </tr>
        <tr>
          <th className="metricLabel">P/B</th>
          {stockData.map((stockData) => {
            return <td> {stockData["P/B"]} </td>;
          })}
        </tr>
        <tr>
          <th>EPS</th>
          {stockData.map((stockData) => {
            return <td> {stockData["EPS"]} </td>;
          })}
        </tr>
        <tr>
          <th>Profit Margin</th>
          {stockData.map((stockData) => {
            return <td> {stockData["Profit Margin"]} </td>;
          })}
        </tr>
        <tr>
          <th>Sector</th>
          {stockData.map((stockData) => {
            return <td> {stockData["Sector"]} </td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Card;
