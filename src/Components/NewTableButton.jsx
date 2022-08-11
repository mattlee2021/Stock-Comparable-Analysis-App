import styles from "./NewTableButton.module.css";

const NewTableButton = ({ setTableData }) => {
  const handleCreateTable = (event) => {
    event.preventDefault();
    setTableData((prev) => {
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
