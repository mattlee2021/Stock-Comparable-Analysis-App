import React, { useRef } from "react";
import styles from "./Card.module.css";
import DeleteButton from "./DeleteButton";
import { useDrag, useDrop } from "react-dnd";

const Card = (props) => {
  const stockData = props.stockData;
  const tableNumber = props.tableNumber;

  const moveCard = props.moveCard;
  const ref = useRef(null);

  const [, drop] = useDrop({
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
      const dragIndex = item.tableNumber; //index of element you are picking up to drag
      const hoverIndex = tableNumber; // index where you are placing the element

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect(); //gets the rectangular border of the element picked up

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY + 100 < hoverMiddleY) {
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
    isDragging: (monitor) => {
      console.log("tableNumber", tableNumber);
      console.log(
        "monitor.getItem().tableNumber",
        monitor.getItem().tableNumber
      );
      return tableNumber !== monitor.getItem().tableNumber; // return true if you want to hide all cards when dragging

      //return true;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <div className={props.isSelected ? styles.isSelected : ""}>
      <div
        className={isDragging ? styles.draggingBorder : ""}
        onClick={props.onClick}
      >
        <table ref={ref} className={isDragging ? styles.draggingCard : ""}>
          <thead>
            <tr>
              <th className={styles.metricLabelStockNames}> Metrics </th>
              {stockData.map((stockData) => {
                return (
                  <th className={styles.stockNames}> {stockData["Name"]} </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={styles.metricLabel}>P/E</th>
              {stockData.map((stockData) => {
                return <td>{stockData["P/E"]}</td>;
              })}
            </tr>
            <tr>
              <th className={styles.metricLabel}>P/B</th>
              {stockData.map((stockData) => {
                return <td> {stockData["P/B"]} </td>;
              })}
            </tr>
            <tr>
              <th className={styles.metricLabel}>EV/EBITDA</th>
              {stockData.map((stockData) => {
                return <td> {stockData["EV/EBITDA"]} </td>;
              })}
            </tr>
            <tr>
              <th className={styles.metricLabel}>EV/Revenue</th>
              {stockData.map((stockData) => {
                return <td> {stockData["EV/Revenue"]} </td>;
              })}
            </tr>
            <tr>
              <th className={styles.metricLabel}>EPS</th>
              {stockData.map((stockData) => {
                return <td> {stockData["EPS"]} </td>;
              })}
            </tr>
            <tr>
              <th className={styles.metricLabel}>Profit Margin</th>
              {stockData.map((stockData) => {
                return <td> {stockData["Profit Margin"]} </td>;
              })}
            </tr>
            <tr>
              <th className={styles.metricLabel}>Sector</th>
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
      </div>
    </div>
  );
};

export default Card;
