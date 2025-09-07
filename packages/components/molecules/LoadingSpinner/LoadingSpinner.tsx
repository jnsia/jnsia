import styles from './LoadingSpinner.module.css';
import Spinner from '../../atoms/Spinner';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = '페이지를 불러오는 중...',
}: LoadingSpinnerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spinner />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
