import type { CountrySeries } from '../types/country.type.ts';

const DATA_URL = '/owid-co2-data.json';
export type Co2Dataset = Record<string, CountrySeries>;
let status: 'pending' | 'success' | 'error' = 'pending';

let dataRef: Co2Dataset | null = null;
let errorRef: Error | null = null;

const promise: Promise<void> = new Promise((resolve, reject) => {
  const worker = new Worker(
    new URL('../workers/jsonWorker.ts', import.meta.url),
    { type: 'module' }
  );

  worker.onmessage = (e) => {
    const { ok, data, error } = e.data || {};
    if (ok) {
      status = 'success';
      dataRef = data;
      worker.terminate();
      resolve();
    } else {
      status = 'error';
      errorRef = new Error(error || 'Worker error');
      worker.terminate();
    }
  };

  worker.onerror = (error) => {
    status = 'error';
    errorRef = new Error(error?.message || 'Worker crashed');
    worker.terminate();
    reject(errorRef);
  };

  worker.postMessage(DATA_URL);
});

export function getCo2Resource(): { read(): Co2Dataset } {
  return {
    read() {
      if (status === 'pending') throw promise;
      if (status === 'error') throw errorRef;
      return dataRef as Co2Dataset;
    },
  };
}
