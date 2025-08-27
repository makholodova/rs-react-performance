import styles from './country-card.module.css';
import type { CountryData } from '../../types/country.type.ts';
import { useCallback, useState } from 'react';
import DataTable from '../data-table/data-table.tsx';

export type CountryCardProps = {
  country: CountryData;
  selectedColumns: string[];
};

export function CountryCard({ country, selectedColumns }: CountryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const data = country.series.data ?? [];
  const latestYear = Math.max(
    ...data.map((r) => Number(r.year)).filter(Number.isFinite)
  );
  const row = data.find((r) => Number(r.year) === latestYear);
  const population = row?.population?.toLocaleString('ru-RU') ?? 'N/A';

  const columns = ['year', ...selectedColumns];

  const handleClick = useCallback(() => setExpanded((p) => !p), []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2 className={styles.title}>{country.name}</h2>
        <p className={styles.text}>
          Population : <span>{population}</span>
        </p>
        <p className={styles.text}>
          ISO code: <span>{country.series.iso_code ?? 'N/A'}</span>
        </p>
      </div>

      <button className={styles.button} onClick={handleClick}>
        {expanded ? 'Skip table' : 'Show table'}
      </button>
      {expanded && <DataTable columns={columns} row={row ?? {}} />}
    </div>
  );
}
