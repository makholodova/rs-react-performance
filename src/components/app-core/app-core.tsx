import styles from './app-core.module.css';
import { getCo2Resource } from '../../service/co2.service.ts';
import { CountryList } from '../country-list/country-list.tsx';
import type { CountryData } from '../../types/country.type.ts';
import Modal from '../modal/modal.tsx';
import { useState } from 'react';
import { DEFAULT_COLS } from '../../const.ts';
import { Controls } from '../controls/controls.tsx';

export default function AppCore() {
  const [modalOpen, setModalOpen] = useState(false);
  const resource = getCo2Resource();
  const data = resource.read();

  const countries: CountryData[] = Object.entries(data).map(
    ([name, series]) => ({
      name,
      series,
    })
  );

  const s = new Set<string>();
  for (const c of Object.values(data)) {
    for (const row of c.data ?? []) {
      for (const [k, v] of Object.entries(row)) {
        if (k !== 'year' && typeof v === 'number' && Number.isFinite(v)) {
          s.add(k);
        }
      }
    }
  }
  const availableFields = Array.from(s).sort();

  const [selectedColumns, setSelectedColumns] = useState<string[]>(() =>
    DEFAULT_COLS.filter((k) => availableFields.includes(k))
  );

  //Years
  const set = new Set<number>();
  for (const c of Object.values(data)) {
    for (const row of c.data ?? [])
      if (typeof row.year === 'number') set.add(row.year);
  }

  const allYears = Array.from(set).sort((a, b) => a - b);

  const [year, setYear] = useState<number>(() => allYears[allYears.length - 1]);
  const handleYearChange = (year: number) => setYear(year);

  //Country
  const [country, setCountry] = useState('');

  const q = country.trim().toLowerCase();
  const visibleCountries = q
    ? countries.filter((c) => c.name.toLowerCase().includes(q))
    : countries;

  return (
    <main className={styles.main}>
      <Controls
        year={year}
        years={allYears}
        onYearChange={handleYearChange}
        country={country}
        onCountryChange={setCountry}
        onOpenModal={() => setModalOpen(true)}
      />

      <CountryList
        year={year}
        countries={visibleCountries}
        selectedColumns={selectedColumns}
      />

      {modalOpen && (
        <Modal
          available={availableFields}
          selected={selectedColumns}
          onChange={setSelectedColumns}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  );
}
