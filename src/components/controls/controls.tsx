import styles from './controls.module.css';

type ControlsProps = {
  year: number;
  years: number[];
  onYearChange: (year: number) => void;

  country: string;
  onCountryChange: (country: string) => void;

  onOpenModal: () => void;
};

export function Controls({
  onOpenModal,
  year,
  years,
  onYearChange,
  country,
  onCountryChange,
}: ControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.label}>
        <span>Year</span>
        <select
          value={year}
          className={styles.select}
          onChange={(e) => onYearChange(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <label>
        <input
          value={country}
          className={styles.search}
          type="search"
          placeholder="Search country.."
          onChange={(e) => onCountryChange(e.target.value)}
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
