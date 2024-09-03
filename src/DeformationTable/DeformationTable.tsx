import Filter from '../Filter/Filter';
import { useTable } from '../useTable';

import styles from './DeformationTable.module.scss'

function DeformationTable({ data }: { data: any[] }) {
  const { tableData, sortOrder, toggleSortOrder, fromDate, toDate, onFromDateChange, onToDateChange } = useTable(data)

  return (
    <>
    <Filter fromDate={fromDate} toDate={toDate} onFromDateChange={onFromDateChange} onToDateChange={onToDateChange}/>
    <div className={styles.wrapper}>
      <table className={`${styles.container} table table-responsive`}>
        <thead>
            <tr>
              <td
                onClick={toggleSortOrder}
                className={`${styles.columnStuck} ${styles.headerCell} ${styles.cursor} table-primary px-5 py-2 fw-bold`}
              >
                Дата и время измерения {sortOrder === 'desc' ? '\u2191': '\u2193'}
              </td>
              <td
                className={`${styles.rowStuck} ${styles.rowStuckOnTop} ${styles.headerCell} table-primary px-5 py-2 fw-bold`}
              >
                Цикл измерения
              </td>
              <td 
                className={`${styles.rowStuck} ${styles.rowStuckOnTop} ${styles.headerCell} table-success px-5 py-2 fw-bold`}
              >
                Отметка, м
              </td>
              <td 
                className={`${styles.rowStuck} ${styles.rowStuckOnTop} ${styles.headerCell} table-success px-5 py-2 fw-bold`}
              >
                &Delta;, м
              </td>
            </tr>
        </thead>
        {!!tableData.length &&
          <tbody>
            {tableData.map((item: any) => (
              <tr key={item.time}>
                <td className={`${styles.dataCell} table-danger`}>{new Date(item.time).toLocaleString()}</td>
                <td className={`${styles.dataCell}`}>-</td>
                <td className={`${styles.dataCell}`}>{item.data.value}</td>
                <td className={`${styles.dataCell}`}>{item.data.delta}</td>
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>
    </>
  )
}

export default DeformationTable
