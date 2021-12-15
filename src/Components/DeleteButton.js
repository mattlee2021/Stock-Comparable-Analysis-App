const DeleteButton = (props) => {
  const handleDeleteStock = (event) => {
    event.preventDefault();
    console.log(props.index);
    console.log(props.stockData);
    props.onStockChange(
      props.stockData.filter((ticker, index) => index !== props.index)
    );
  };

  return <button onClick={handleDeleteStock}>Delete</button>;
};

export default DeleteButton;
