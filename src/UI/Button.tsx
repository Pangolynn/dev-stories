import styles from "../App.module.css";

type ButtonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | undefined;
  className?: string;
  children?: React.ReactNode | undefined;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  children,
  ...rest
}) => {
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
