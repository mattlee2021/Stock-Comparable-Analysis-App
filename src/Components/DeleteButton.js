import "./DeleteButton.scss";

const DeleteButton = (props) => {
  const handleDeleteStock = (event) => {
    event.preventDefault();
    //console.log("table Number", props.tableNumber);
    props.setTableData((prev) => {
      const rowToEdit = prev[props.tableNumber];
      const editedRow = rowToEdit.filter((ticker) => ticker !== props.ticker);
      //console.log("rowToEdit after", editedRow);
      prev[props.tableNumber] = editedRow;
      return [...prev];
    });
  };

  return (
    <button
      onClick={handleDeleteStock}
      className="deleteButton"
      data-testid="delete-button"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
