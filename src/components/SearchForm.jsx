import InputWithLabel from "../UI/InputWithLabel";
import styles from "../App.module.css";

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  className,
}) => (
  <form className={styles.searchForm} onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
      type="text"
      isFocused
    >
      Search:
    </InputWithLabel>
    <button
      className={`${styles.button} ${styles.className}`}
      type="submit"
      disabled={!searchTerm}
    >
      Submit
    </button>
  </form>
);

export default SearchForm;
