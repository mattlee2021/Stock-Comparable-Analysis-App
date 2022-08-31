import Card from "./Card";
import update from "immutability-helper";
import { useCallback } from "react";
import styles from "./TableContainer.module.css";

const TableContainer = (props) => {
  const { tableData, setTableData, setSelectedTableIndex, selectedTableIndex } =
    props;

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

  return (
    <div className={styles.tableContainer}>
      {tableData.map((stockData, index) => (
        <Card
          key={index}
          tableNumber={index}
          stockData={stockData}
          setTableData={setTableData}
          moveCard={moveCard}
          onClick={() => {
            setSelectedTableIndex(index);
          }}
          isSelected={index === selectedTableIndex}
        />
      ))}
    </div>
  );
};

export default TableContainer;
