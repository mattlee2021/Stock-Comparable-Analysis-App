import Card from "./Card";
const TableContainer = (props) => {
  const { tableData, setTableData } = props;
  console.log("tableData container", tableData);
  return tableData.map((stockData, index) => {
    return (
      <Card
        key={index}
        tableNumber={index}
        stockData={stockData}
        setTableData={setTableData}
      />
    );
  });
};

export default TableContainer;
