import React, { useState } from "react";
import StockSearch from "./components/StockSearch";
import TableContainer from "./components/TableContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";

function App() {
  const [tableData, setTableData] = useState([[]]);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);

  console.log(process.env.REACT_APP_ALPHA_VANTAGE_KEY);

  let tableIndex;

  const getStockData = (newStock) => {
    if (selectedTableIndex === null) {
      tableIndex = tableData.length - 1;
    } else {
      tableIndex = selectedTableIndex;
    }

    for (const existingStock of tableData[tableIndex]) {
      if (existingStock.Ticker === newStock.Ticker) {
        return;
      }
    }
    const temp = tableData.slice();
    temp[tableIndex].push(newStock);
    setTableData(temp);
  };

  return (
    <React.Fragment>
      <DndProvider backend={HTML5Backend}>
        <StockSearch getStockData={getStockData} setTableData={setTableData} />
        <TableContainer
          tableData={tableData}
          setSelectedTableIndex={setSelectedTableIndex}
          setTableData={setTableData}
          selectedTableIndex={selectedTableIndex}
        />
      </DndProvider>
    </React.Fragment>
  );
}

export default App;
