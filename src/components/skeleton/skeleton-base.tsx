import styles from './skeleton.module.css';

type SkeletonBaseProps = {
  w?: number | string;
  h?: number | string;
  r?: number;
  className?: string;
};

export const SkeletonBase = ({
  w = '100%',
  h = 16,
  r = 6,
  className,
}: SkeletonBaseProps) => {
  return (
    <div
      className={`${styles.skeletonBase} ${className ?? ''}`}
      style={{ width: w, height: h, borderRadius: r }}
    />
  );
};
