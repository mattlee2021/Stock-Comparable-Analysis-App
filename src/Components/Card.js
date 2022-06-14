import React, { useRef } from "react";
import "./Card.scss";
import DeleteButton from "./DeleteButton";
import { useDrag, useDrop } from "react-dnd";

const Card = (props) => {
  const stockData = props.stockData;
  //console.log("stockData 1", stockData);
  const tableNumber = props.tableNumber;
  const moveCard = props.moveCard;
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      //console.log("item", item);
      const dragIndex = item.tableNumber; //index of element you are picking up to drag
      const hoverIndex = tableNumber; // index where you are placing the element

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect(); //gets the rectangular border of the element picked up
      console.log("hoverBoundingRect", hoverBoundingRect);

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      console.log("element clientOffset monitor", clientOffset);

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return; // only move elements once they get passed the middle
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.tableNumber = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: () => {
      return { tableNumber };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <table ref={ref}>
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
                  tableNumber={props.tableNumber}
                  stockData={stockData}
                  setTableData={props.setTableData}
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
