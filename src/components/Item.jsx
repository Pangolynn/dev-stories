import Button from "../UI/Button";
// import "./Item.css";

const Item = ({ item, onRemoveItem }) => {
  return (
    <li className="item">
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>

      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <span style={{ width: "10%" }}>
        <Button
          type="button"
          onClick={() => onRemoveItem(item)}
          className="button button_small"
        >
          Remove
        </Button>
      </span>
    </li>
  );
};

export default Item;
