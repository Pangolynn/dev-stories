// import * as React from "react";
import Button from "./UI/Button";

import React, { useEffect, useRef, useState } from "react";
import RadioButton from "./UI/RadioButton";
import Checkbox from "./UI/Checkbox";

const initStories = [
  {
    title: "React",
    url: "someUrl",
    author: "author1",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "url2",
    author: "author2",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { stories: initStories } }), 2000)
  );

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
  const [stories, setStories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAsyncStories()
      .then((result) => {
        setStories(result.data.stories);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  const onRadioChange = (e) => {
    setRadioValue((val) => {
      if (!val) {
        e.target.checked = false;
      }
      return !val;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((x) =>
    x.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => {
      return item.objectID !== story.objectID;
    });

    setStories(newStories);
  };

  return (
    <div>
      <h1>Dev Stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
        isFocused
      >
        Search:
      </InputWithLabel>
      <hr />

      {isError && <p>Something went wrong.</p>}
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <List list={filteredStories} onRemoveItem={handleRemoveStory} />
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
