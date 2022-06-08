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

    // generate new array with slice, push, and return the element ; immmutable is generate new reference
    const temp = tableData.slice();
    temp[temp.length - 1].push(newStock);
    setTableData(temp);
    // setTableData((prev) => {
    //   // console.log("table data", tableData);
    //   //console.log("app prev", prev);
    //   const lastTable = prev[prev.length - 1];

    //   prev.pop();
    //   lastTable.push(newStock);
    //   console.log("lastTable", lastTable);
    //   return [...prev, lastTable];
    // });
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
