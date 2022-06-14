import Card from "./Card";
import update from "immutability-helper";
import { useCallback } from "react";

const TableContainer = (props) => {
  const { tableData, setTableData } = props;

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      console.log("dragIndex", dragIndex);
      console.log("hoverIndex", hoverIndex);
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

  const renderCard = useCallback((stockData, index) => {
    return (
      <Card
        key={index}
        tableNumber={index}
        stockData={stockData}
        setTableData={setTableData}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <>
      <div>
        {tableData.map((stockData, index) => renderCard(stockData, index))}
      </div>
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
