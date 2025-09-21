import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <span className={styles.spinner} aria-label="로딩중">
      <svg
        className={styles.spinner}
        width="18"
        height="18"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#bbb"
          strokeWidth="5"
          opacity="0.3"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#2684ff"
          strokeWidth="5"
          strokeDasharray="90"
          strokeDashoffset="60"
        />
      </svg>
    </span>
  );
}
