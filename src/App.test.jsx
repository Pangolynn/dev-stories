import { describe, it, expect, vi } from "vitest";
import App, { storiesReducer } from "./App";
import axios from "axios";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Item from "./components/Item";
import SearchForm from "./components/SearchForm";

// Item,
// List,
// SearchForm,
// InputWithLabel

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrw Clark",
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("storiesReducer", () => {
  it("removes a story from all stories", () => {
    const action = { type: "REMOVE_STORY", payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("fails to fetch stories", () => {
    //given a state and an action, we expect the following new state
    const action = { type: "STORIES_FETCH_FAILURE", payload: [] };
    const state = { data: undefined, isLoading: false, isError: true };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: undefined,
      isLoading: false,
      isError: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("fetches new stories", () => {
    const action = { type: "STORIES_FETCH_SUCCESS", payload: "ruby" };
    const state = { data: [], isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const getInit = async () => {
      try {
        const result = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=ruby"
        );

        const payload = result.data.hits;

        const expectedState = {
          data: payload,
          isLoading: true,
          isError: false,
        };

        expect(newState).toStrictEqual(expectedState);
      } catch {
        console.log("error");
      }
    };
    getInit();
  });

  it("starts fetching stories", () => {
    const action = { type: "STORIES_FETCH_INIT" };
    const state = { data: [], isLoading: true, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isLoading: true,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

describe("App component", () => {
  it("removes an item when clicking the Dismiss button", () => {});
  it("requests some initial stories from an API", () => {});
});

describe("Item", () => {
  it("renders all properties", () => {
    render(<Item item={storyOne} />);

    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();

    expect(screen.getByText("React")).toHaveAttribute(
      "href",
      "https://reactjs.org/"
    );
  });

  it("renders a clickable dismiss button", () => {
    render(<Item item={storyOne} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("clicking the dismiss button calls the callback handler", () => {
    const handleRemoveItem = vi.fn();

    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "react",
    onSearchInput: vi.fn(),
    onSearchSubmit: vi.fn(),
    className: "test",
  };

  it("renders the input field with its value", () => {
    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByDisplayValue("react")).toBeInTheDocument();
  });

  it("renders the correct label", () => {
    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  it("calls onSearchInput on input field change", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.change(screen.getByDisplayValue("react"), {
      target: { value: "Redux" },
    });
    expect(searchFormProps.onSearchInput).toHaveBeenCalled(1);
  });

  it("calls onSearchSubmit on button submit click", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.submit(screen.getByRole("button"));

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });
});

// TODO: InputWithLabel tests and List tests
describe("InputWithLabel", () => {
  it("renders an input field", () => {});

  it("renders a label", () => {});
});

describe("List", () => {
  it("renders a list of Items", () => {});
});
