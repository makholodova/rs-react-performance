import { SkeletonBase } from './skeleton-base.tsx';
import styles from './skeleton.module.css';

export const SkeletonCard = () => (
  <div className={styles.card}>
    <div className={styles.info}>
      <SkeletonBase w={150} h={18} />
      <SkeletonBase w={250} h={18} />
      <SkeletonBase w={150} h={18} />
    </div>

    <SkeletonBase w={88} h={34} r={10} />
  </div>
);
