import { SkeletonControls } from './skeleton-controls.tsx';
import { SkeletonCard } from './skeleton-card.tsx';
import styles from './skeleton.module.css';

type SkeletonProps = {
  count?: number;
};

export const Skeleton = ({ count = 8 }: SkeletonProps) => (
  <div className={styles.skeleton}>
    <SkeletonControls />
    <div className={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);
