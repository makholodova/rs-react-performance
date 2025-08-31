import { SkeletonBase } from './skeleton-base.tsx';
import styles from './skeleton.module.css';

export const SkeletonControls = () => (
  <div className={styles.controls}>
    <SkeletonBase w={40} h={18} />
    <SkeletonBase w={100} h={36} r={10} />
    <SkeletonBase w={200} h={36} r={10} />
    <SkeletonBase w={60} h={18} />
    <SkeletonBase w={160} h={36} r={10} />
    <SkeletonBase w={130} h={36} r={10} />
  </div>
);
