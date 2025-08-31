import React from 'react';
import styles from './country-list.module.css';
import { CountryCard } from '../country-card/country-card.tsx';
import type { CountryData } from '../../types/country.type.ts';

export type CountryListProps = {
  countries: CountryData[];
  columns: string[];
  year: number;
};

export const CountryList = React.memo(function CountryList({
  countries,
  columns,
  year,
}: CountryListProps) {
  if (!countries.length)
    return <div className={styles.empty}>No countries to display</div>;

  return (
    <div className={styles.list}>
      {countries.map((country) => (
        <CountryCard
          year={year}
          columns={columns}
          key={country.name}
          country={country}
        />
      ))}
    </div>
  );
});
