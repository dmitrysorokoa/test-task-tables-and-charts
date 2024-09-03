import { useRef } from "react";
import useDimension from "../useDimension";
import styles from './TermoTable.module.scss'
import { useTable } from "../useTable";
import Filter from "../Filter/Filter";

interface Props {
  data: any[];
  depths: number[];
}

function TermoTable({ data, depths }: Props) {
  const { tableData, sortOrder, toggleSortOrder, fromDate, toDate, onFromDateChange, onToDateChange } = useTable(data)

  const wrapperRef = useRef<HTMLTableCellElement>(null)
  const teamsRef = useRef<HTMLTableCellElement>(null)
  const teRef = useRef<HTMLTableCellElement>(null)
  const runsRef = useRef<HTMLTableCellElement>(null)

  const wrapperDimension = useDimension(wrapperRef, data)
  const teamsDimension = useDimension(teamsRef, data)
  const runsDimension = useDimension(runsRef, data)
  const teDimension = useDimension(teRef, data)
  
  return (
    <>
      <Filter fromDate={fromDate} toDate={toDate} onFromDateChange={onFromDateChange} onToDateChange={onToDateChange}/>
      <div ref={wrapperRef} className={styles.wrapper}>
        <label
          style={{ left: `${(wrapperDimension.width - teamsDimension.width - teDimension.width) / 2 + teamsDimension.width + teDimension.width}px`}}
          className={`${styles.label} fw-bold`}
        >
          Глубина, м
        </label>
        <table className={`${styles.container} table table-responsive`}>
          <thead>
              <tr>
                <td
                  onClick={toggleSortOrder}
                  ref={teamsRef}
                  className={`${styles.columnStuck} ${styles.headerCell} ${styles.cursor} table-primary px-5 py-2 fw-bold`}
                  rowSpan={2}
                >
                  Дата и время измерения {sortOrder === 'desc' ? '\u2191': '\u2193'}
                </td>
                <td
                  style={{ left: `${teamsDimension.width}px`}}
                  ref={teRef}
                  className={`${styles.columnStuck} ${styles.headerCell} table-primary px-5 py-2 fw-bold`}
                  rowSpan={2}
                >
                  T<sub>e</sub>
                </td>
                <td 
                  style={{ left: `${teamsDimension.width + teDimension.width}px`}}
                  ref={runsRef}
                  className={`${styles.rowStuck} ${styles.rowStuckOnTop} ${styles.headerCell} table-primary px-5 py-2`}
                  colSpan={depths.length}
                >
                  &nbsp;
                </td>
              </tr>
              <tr>
                {depths.map((el) => (
                  <td
                    key={el}
                    style={{ top: `${runsDimension.height}px`}}
                    colSpan={1}
                    className={`${styles.rowStuck} ${styles.headerCell} table-success px-5 py-2 fw-bold`}
                  >
                    {el}
                  </td>
                ))}
              </tr>
          </thead>
          {!!tableData.length &&
            <tbody>
              {tableData.map((item: any) => (
                <tr key={item.time}>
                  <td className={`${styles.dataCell} table-danger`}>{new Date(item.time).toLocaleString()}</td>
                  <td className={`${styles.dataCell} table-danger`} style={{ left: `${teamsDimension.width}px`}}>{item.averageTemperature.toFixed(2)}</td>
                  {depths.map(el => (
                    <td className={styles.dataCell} key={el}>{item.data[el] ? item.data[el].value : '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </>
  )
}

export default TermoTable
