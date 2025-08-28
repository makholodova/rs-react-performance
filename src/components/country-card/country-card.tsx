import styles from './country-card.module.css';
import type { CountryData } from '../../types/country.type.ts';
import React, { useCallback, useMemo, useState } from 'react';
import { DataTable } from '../data-table/data-table.tsx';

export type CountryCardProps = {
  country: CountryData;
  columns: string[];
  year: number;
};

export const CountryCard = React.memo(function CountryCard({
  country,
  columns,
  year,
}: CountryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const row = useMemo(() => {
    const data = country.series.data ?? [];
    return data.find((r) => Number(r.year) === year);
  }, [country.series.data, year]);

  const population = useMemo(
    () => row?.population?.toLocaleString('ru-RU') ?? 'N/A',
    [row]
  );

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
});
