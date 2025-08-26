import styles from './controls.module.css';

type ControlsProps = {
  onOpenModal: () => void;
};

export function Controls({ onOpenModal }: ControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.label}>
        <span>Year</span>
        <select className={styles.select}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </label>

      <label>
        <input
          className={styles.search}
          type="search"
          placeholder="Search country.."
        />
      </label>
      <label className={styles.label}>
        <span>Sort by</span>
        <select className={styles.select}>
          <option value="population-desc">Population ↓ </option>
          <option value="population-asc">Population ↑ </option>
          <option value="population-asc">Name A→Z </option>
          <option value="population-desc">Name Z→A </option>
        </select>
      </label>
      <button className={styles.button} onClick={onOpenModal}>
        Select columns
      </button>
    </div>
  );
}
