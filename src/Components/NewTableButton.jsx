import styles from "./NewTableButton.module.css";

const NewTableButton = ({ setTableData, setSelectedTableIndex }) => {
  const handleCreateTable = (event) => {
    event.preventDefault();
    setTableData((prev) => {
      let lastTableIndex = prev.length;
      setSelectedTableIndex(lastTableIndex);
      return [...prev, []];
    });
  };
  return (
    <button
      type="submit"
      onClick={handleCreateTable}
      className={styles.newTableButton}
    >
      Create New Table
    </button>
  );
};

export default NewTableButton;
