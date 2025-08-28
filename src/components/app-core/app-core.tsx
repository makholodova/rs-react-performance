import styles from './app-core.module.css';
import { getCo2Resource } from '../../service/co2.service.ts';
import { CountryList } from '../country-list/country-list.tsx';
import type { CountryData, SortKey } from '../../types/country.type.ts';
import Modal from '../modal/modal.tsx';
import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_COLS } from '../../const.ts';
import { Controls } from '../controls/controls.tsx';

export default function AppCore() {
  const [modalOpen, setModalOpen] = useState(false);
  const resource = getCo2Resource();
  const data = resource.read();

  const countries: CountryData[] = useMemo(
    () =>
      Object.entries(data).map(([name, series]) => ({
        name,
        series,
      })),
    [data]
  );

  const availableFields = useMemo(() => {
    const s = new Set<string>();
    for (const c of Object.values(data)) {
      for (const row of c.data ?? []) {
        for (const [k, v] of Object.entries(row)) {
          if (k !== 'year' && Number.isFinite(v)) {
            s.add(k);
          }
        }
      }
    }
    return Array.from(s).sort();
  }, [data]);

  const allYears = useMemo(() => {
    const set = new Set<number>();
    for (const c of Object.values(data)) {
      for (const row of c.data ?? []) set.add(row.year);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [data]);

  const [selectedColumns, setSelectedColumns] = useState<string[]>(() =>
    DEFAULT_COLS.filter((k) => availableFields.includes(k))
  );
  const columns = useMemo(
    () => ['year', ...selectedColumns],
    [selectedColumns]
  );

  const [year, setYear] = useState<number>(() => allYears[allYears.length - 1]);
  const [sort, setSort] = useState<SortKey>('population-desc');
  const [country, setCountry] = useState('');

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

  const visibleCountries = useMemo(() => {
    const query = country.trim().toLowerCase();
    const filtered = query
      ? countries.filter((c) => c.name.toLowerCase().includes(query))
      : countries;

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'population-asc': {
          const pa =
            a.series.data?.find((r) => r.year === year)?.population ?? 0;
          const pb =
            b.series.data?.find((r) => r.year === year)?.population ?? 0;
          return pa - pb;
        }
        case 'population-desc': {
          const pa =
            a.series.data?.find((r) => r.year === year)?.population ?? 0;
          const pb =
            b.series.data?.find((r) => r.year === year)?.population ?? 0;
          return pb - pa;
        }
        default:
          return 0;
      }
    });
  }, [country, countries, sort, year]);

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

      <CountryList year={year} countries={visibleCountries} columns={columns} />

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
