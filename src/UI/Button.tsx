import styles from "../App.module.css";

const Button = ({ type = "button", onClick, className, children, ...rest }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[className]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
