import React, { useState } from "react";
import StockSearch from "./components/StockSearch";
import TableContainer from "./components/TableContainer";

function App() {
  const [tableData, setTableData] = useState([[]]);

  const getStockData = (newStock) => {
    const lastTable = tableData[tableData.length - 1];
    for (const existingStock of lastTable) {
      if (existingStock.Ticker === newStock.Ticker) {
        return;
      }
    }
    const temp = tableData.slice();
    temp[temp.length - 1].push(newStock);
    setTableData(temp);
  };

  const handleCreateTable = (event) => {
    event.preventDefault();
    setTableData((prev) => {
      return [...prev, []];
    });
  };

  return (
    <React.Fragment>
      <StockSearch
        getStockData={getStockData}
        handleCreateTable={handleCreateTable}
      />
      <TableContainer tableData={tableData} setTableData={setTableData} />
    </React.Fragment>
  );
}

export default App;
