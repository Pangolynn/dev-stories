import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

// Styling
import styles from "./App.module.css";
import { ReactComponent as Github } from "./github.svg";

// UI Components
import Button from "./UI/Button";
import RadioButton from "./UI/RadioButton";
import Checkbox from "./UI/Checkbox";

// Components
import List from "./components/List";
import SearchForm from "./components/SearchForm";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

/* storiesReducer action types */
const REMOVE_STORY = "REMOVE_STORY";
const STORIES_FETCH_INIT = "STORIES_FETCH_INIT";
const STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS";
const STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE";

// reducers come w/ a current state, and an action which comes with type/payload
const storiesReducer = (state, action) => {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REMOVE_STORY:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState = (key, initialState) => {
  const isMounted = React.useRef(false);

  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  // set the initial state by accessing local Storage or initial state which is passed in

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  // return an array to match the same way you could use useState hook
  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [radioValue, setRadioValue] = useState("false");

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const onRadioChange = (e) => {
    setRadioValue((val) => {
      if (!val) {
        e.target.checked = false;
      }
      return !val;
    });
  };

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };

  const handleRemoveStory = useCallback((item) => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item,
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>
        <Github height="18px" width="18px" />
        Dev Stories
      </h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        className="button-large"
      />

      {stories.isError && <p>Something went wrong.</p>}
      {stories.isLoading ? (
        <p>Loading</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
      <Button classes="one two">Click Me</Button>
      <RadioButton
        value={radioValue}
        label="Test radio"
        onClick={onRadioChange}
      />
      <Checkbox name="testCheck" label="Test Check" />
    </div>
  );
};

export default App;
