import Item from "./Item";

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

export default List;
