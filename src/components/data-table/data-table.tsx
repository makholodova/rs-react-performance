import styles from './data-table.module.css';

export type DataTableProps = {
  columns: string[];
  row: Record<string, unknown>;
};

export default function DataTable({ columns, row }: DataTableProps) {
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </thead>
      <tbody className={styles.body}>
        <tr>
          {columns.map((col) => (
            <td key={col}>{row[col] != null ? String(row[col]) : 'N/A'}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
