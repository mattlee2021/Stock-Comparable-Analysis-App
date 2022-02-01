import "./DeleteButton.scss";

const DeleteButton = (props) => {
  const handleDeleteStock = (event) => {
    event.preventDefault();
    props.onStockChange(
      props.stockData.filter((ticker, index) => index !== props.index)
    );
  };

  return (
    <button onClick={handleDeleteStock} className="deleteButton">
      Delete
    </button>
  );
};

export default DeleteButton;
