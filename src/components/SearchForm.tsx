import styles from "../App.module.css";

import InputWithLabel from "../UI/InputWithLabel";
import Button from "../UI/Button";

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};

const SearchForm: React.FC<SearchFormProps> = ({
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
    <Button className={className} type="submit" disabled={!searchTerm}>
      Submit
    </Button>
  </form>
);

export default SearchForm;
