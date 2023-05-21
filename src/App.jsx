// import * as React from "react";
import axios from "axios";
import Button from "./UI/Button";

import React, { useCallback, useEffect, useRef, useState } from "react";
import RadioButton from "./UI/RadioButton";
import Checkbox from "./UI/Checkbox";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

/* storiesReducer action types */
const REMOVE_STORY = "REMOVE_STORY";

// reducers come w/ a current state, and an action which comes with type/payload
const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
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
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);
  // set the initial state by accessing local Storage or initial state which is passed in

  useEffect(() => {
    // everytime the searchterm is updated (user types in search input) useffect
    // will run, and update the localStorage to match React's internal state.
    localStorage.setItem(key, value);
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
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
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

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: REMOVE_STORY,
      payload: item,
    });
  };

  return (
    <div>
      <h1>Dev Stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr />

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

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
      type="text"
      isFocused
    >
      Search:
    </InputWithLabel>
    <button type="submit" disabled={!searchTerm}>
      Submit
    </button>
  </form>
);

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list !== "" &&
      list.map((item) => (
        <>
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        </>
      ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => {
  return (
    <li>
      {item.title}
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <Button type="button" onClick={() => onRemoveItem(item)}>
          Remove
        </Button>
      </span>
    </li>
  );
};

const InputWithLabel = ({
  id,
  children,
  value,
  onInputChange,
  type = "text",
  isFocused,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused, inputRef]);

  return (
    <div>
      <label htmlFor={id}>{children} </label>
      &nbsp;
      <input
        ref={inputRef}
        onChange={onInputChange}
        type={type}
        id={id}
        value={value}
      />
    </div>
  );
};

export default App;
