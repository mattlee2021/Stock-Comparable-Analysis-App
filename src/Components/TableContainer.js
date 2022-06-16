import Card from "./Card";
import update from "immutability-helper";
import { useCallback } from "react";

const TableContainer = (props) => {
  const { tableData, setTableData } = props;

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
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
        <Card
          key={index}
          tableNumber={index}
          stockData={stockData}
          setTableData={setTableData}
          moveCard={moveCard}
        />
      ))}
    </>
  );
};

export default TableContainer;
