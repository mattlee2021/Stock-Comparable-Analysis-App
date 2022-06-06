import Card from "./Card";
const TableContainer = (props) => {
  const { tableData, setStockData } = props;
  console.log("tableData container", tableData);
  return tableData.map((stockData) => {
    return <Card stockData={stockData} setStockData={setStockData} />;
  });
};

export default TableContainer;
