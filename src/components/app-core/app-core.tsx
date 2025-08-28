import styles from './app-core.module.css';
import { getCo2Resource } from '../../service/co2.service.ts';
import { CountryList } from '../country-list/country-list.tsx';
import type { CountryData, SortKey } from '../../types/country.type.ts';
import Modal from '../modal/modal.tsx';
import { useCallback, useState } from 'react';
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

  const set = new Set<number>();
  for (const c of Object.values(data)) {
    for (const row of c.data ?? [])
      if (typeof row.year === 'number') set.add(row.year);
  }

  const allYears = Array.from(set).sort((a, b) => a - b);

  const [year, setYear] = useState<number>(() => allYears[allYears.length - 1]);

  const [sort, setSort] = useState<SortKey>('population-desc');
  const [country, setCountry] = useState('');
  const q = country.trim().toLowerCase();
  let visibleCountries = q
    ? countries.filter((c) => c.name.toLowerCase().includes(q))
    : countries;

  visibleCountries = [...visibleCountries].sort((a, b) => {
    switch (sort) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'population-asc': {
        const pa = a.series.data?.find((r) => r.year === year)?.population ?? 0;
        const pb = b.series.data?.find((r) => r.year === year)?.population ?? 0;
        return pa - pb;
      }
      case 'population-desc': {
        const pa = a.series.data?.find((r) => r.year === year)?.population ?? 0;
        const pb = b.series.data?.find((r) => r.year === year)?.population ?? 0;
        return pb - pa;
      }
      default:
        return 0;
    }
  });

  const handleOpenModal = useCallback(() => setModalOpen(true), []);
  const handleCloseModal = useCallback(() => setModalOpen(false), []);
  const handleYearChange = useCallback((year: number) => setYear(year), []);
  const handleCountryChange = useCallback(
    (country: string) => setCountry(country),
    []
  );
  const handleSortChange = useCallback((sort: SortKey) => setSort(sort), []);
  const handleColumnsChange = useCallback(
    (columns: string[]) => setSelectedColumns(columns),
    []
  );

  return (
    <main className={styles.main}>
      <Controls
        year={year}
        years={allYears}
        onYearChange={handleYearChange}
        country={country}
        onCountryChange={handleCountryChange}
        sort={sort}
        onSortChange={handleSortChange}
        onOpenModal={handleOpenModal}
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
          onChange={handleColumnsChange}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
