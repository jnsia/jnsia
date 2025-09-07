import styles from './ExpandIcon.module.css';

export default function ExpandIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`${styles.expandIcon} ${expanded ? styles.expanded : ''}`}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>
  );
}
