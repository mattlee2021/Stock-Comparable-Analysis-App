import React, { useState } from "react";
import Card from "./components/Card";
import StockSearch from "./components/StockSearch";
import TableContainer from "./components/TableContainer";

function App() {
  const [stockData, setStockData] = useState([]);
  const [tableData, setTableData] = useState([[]]);
  // const getStockData = (newStock, isAutoGenerated) => {
  //   for (const stock of stockData) {
  //     if (!isAutoGenerated && newStock.Ticker === stock.Ticker) {
  //       // alert(newStock.Ticker + " is already on your list!");
  //       return;
  //     } else if (newStock.Ticker === stock.Ticker) {
  //       return;
  //     }
  //   }

  //   setStockData((prev) => {
  //     return [...prev, newStock];
  //   });
  // };

  const getStockData = (newStock, isAutoGenerated) => {
    for (const stock of stockData) {
      if (!isAutoGenerated && newStock.Ticker === stock.Ticker) {
        // alert(newStock.Ticker + " is already on your list!");
        return;
      } else if (newStock.Ticker === stock.Ticker) {
        return;
      }
    }

    const temp = tableData.slice();
    temp[temp.length - 1].push(newStock);
    setTableData(temp);

    // how to put the stock in the last place of tableData
    // AND re-render the entire app

    // tableData[tableData.length - 1].push(newStock);

    // console.log("temp", temp);
    // setStockData((prev) => {
    //   return [...prev, newStock];
    // });
    //setTableData([stockData]);
    // setTableData((prevStockList) => {
    //   return [...prevStockList, stockData];
    // });
  };

  console.log(tableData);

  const handleCreateTable = (event) => {
    event.preventDefault();
    setTableData((prev) => {
      return [...prev, []];
    });
    setStockData([]);
  };

  console.log("tableData", tableData);

  return (
    <React.Fragment>
      <StockSearch
        getStockData={getStockData}
        handleCreateTable={handleCreateTable}
        setStockData={setStockData}
      />
      {/* <Card stockData={stockData} setStockData={setStockData} /> */}
      <TableContainer tableData={tableData} setStockData={setStockData} />
    </React.Fragment>
  );
}

export default App;
