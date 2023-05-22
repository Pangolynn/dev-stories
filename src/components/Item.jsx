import Button from "../UI/Button";

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

export default Item;
