import "./DeleteButton.scss";

const DeleteButton = (props) => {
  const handleDeleteStock = (event) => {
    event.preventDefault();
    props.onStockChange(
      props.stockData.filter((ticker, index) => index !== props.index)
    );
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
