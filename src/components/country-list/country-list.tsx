import styles from './country-list.module.css';
import { CountryCard } from '../country-card/country-card.tsx';
import type { CountryData } from '../../types/country.type.ts';

export type CountryListProps = {
  countries: CountryData[];
  selectedColumns: string[];
};

export function CountryList({ countries, selectedColumns }: CountryListProps) {
  if (!countries.length)
    return <div className={styles.empty}>No countries to display</div>;

  return (
    <div className={styles.list}>
      {countries.map((country) => (
        <CountryCard
          selectedColumns={selectedColumns}
          key={country.name}
          country={country}
        />
      ))}
    </div>
  );
}
