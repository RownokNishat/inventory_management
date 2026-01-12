import styles from './Checkbox.module.css';

const Checkbox = ({ label, id, checked, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={styles.label}>{label}</label>
    </div>
  );
};

export default Checkbox;
