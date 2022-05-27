import "./DeleteButton.scss";

const DeleteButton = (props) => {
  const handleDeleteStock = (event) => {
    event.preventDefault();
    props.setStockData(
      props.stockData.filter((ticker) => ticker !== props.ticker)
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
