export type CountryData = {
  name: string;
  series: CountrySeries;
};

export type CountrySeries = {
  data: YearData[];
  iso_code?: string;
};

export type YearData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
};

export type SortKey =
  | 'population-desc'
  | 'population-asc'
  | 'name-asc'
  | 'name-desc';
