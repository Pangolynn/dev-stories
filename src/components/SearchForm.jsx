import InputWithLabel from "../UI/InputWithLabel";

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  className,
}) => (
  <form className="search-form" onSubmit={onSearchSubmit}>
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
      className={`button ${className}`}
      type="submit"
      disabled={!searchTerm}
    >
      Submit
    </button>
  </form>
);

export default SearchForm;
