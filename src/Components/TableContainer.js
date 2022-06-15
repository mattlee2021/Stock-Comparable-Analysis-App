import Card from "./Card";
import update from "immutability-helper";
import { useCallback, useState } from "react";
import "./TableContainer.scss";

const TableContainer = (props) => {
  const { tableData, setTableData } = props;
  const [isDragging, setIsDragging] = useState(false);

  console.log("isDragging TableContainer", isDragging); // changes to false quickly when picking up non-last table

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      // console.log("dragIndex", dragIndex);
      // console.log("hoverIndex", hoverIndex);
      setTableData((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [setTableData]
  );

  //console.log("tableData", tableData);

  // const renderCard = useCallback(
  //   (stockData, index) => {
  //     return (
  //       <Card
  //         className={isDragging ? "dragging-card" : ""}
  //         key={index}
  //         tableNumber={index}
  //         stockData={stockData}
  //         setTableData={setTableData}
  //         moveCard={moveCard}
  //         setIsDragging={setIsDragging}
  //       />
  //     );
  //   },
  //   [isDragging]
  // );

  return (
    <>
      {tableData.map((stockData, index) => (
        <div className={isDragging ? "dragging-border" : ""}>
          <Card
            key={index}
            tableNumber={index}
            stockData={stockData}
            setTableData={setTableData}
            moveCard={moveCard}
            setIsDragging={setIsDragging}
          />
        </div>
      ))}
    </>
  );

  // return tableData.map((stockData, index) => {
  //   return (
  //     <Card
  //       key={index}
  //       tableNumber={index}
  //       stockData={stockData}
  //       setTableData={setTableData}
  //       moveCard={moveCard}
  //     />
  //   );
  // });
};

export default TableContainer;
