/*import styles from './app-core.module.css';*/
import { getCo2Resource } from '../../service/co2.service.ts';
import { CountryList } from '../country-list/country-list.tsx';
import type { CountryData } from '../../types/country.type.ts';
import Modal from '../modal/modal.tsx';
import { useState } from 'react';
import { DEFAULT_COLS } from '../../const.ts';

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

  console.log('data', data);

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

  console.log('selectedColumns', selectedColumns);

  return (
    <div>
      <button className="primary" onClick={() => setModalOpen(true)}>
        Выбрать колонки…
      </button>
      <CountryList countries={countries} selectedColumns={selectedColumns} />

      {modalOpen && (
        <Modal
          available={availableFields}
          selected={selectedColumns}
          onChange={setSelectedColumns}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
