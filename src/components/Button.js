import styles from './Button.module.css';

const Button = ({ children, type = 'button', onClick, fullWidth = false }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
