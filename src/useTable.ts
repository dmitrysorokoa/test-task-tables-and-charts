import { useCallback, useMemo, useState } from "react";
import moment from "moment";

export const useTable = (data: any) => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('desc');

  const toggleSortOrder = useCallback(
    () => setSortOrder(value => value === 'desc' ? 'asc' : 'desc'),
    []
  )

  const onFromDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value ? moment(e.target.value).format('YYYY-MM-DD') : '')
  }, [])

  const onToDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value ? moment(e.target.value).format('YYYY-MM-DD') : '')
  }, [])

  const tableData = useMemo(() => {
    const startDate = fromDate ? new Date(fromDate) : null
    const endDate = toDate ? new Date(toDate) : null

    const filteredData = startDate || endDate ? data.filter((el: any) => {
      const time = new Date(el.time)
      
      if (startDate && endDate) {
        return time >= startDate && time <= endDate
      }

      if (!startDate && endDate) {
        return time <= endDate
      }

      if (!endDate && startDate) {
        return time >= startDate
      }
    }) : [...data]

    filteredData.sort((a: any, b: any) => {
      const first = new Date(a.time).getTime()
      const second = new Date(b.time).getTime()
      if (sortOrder === 'desc') {
        return first - second
      } else {
        return second - first
      }
    });

    return filteredData
  }, [data, sortOrder, fromDate, toDate])

  return { tableData, sortOrder, toggleSortOrder, onFromDateChange, onToDateChange, fromDate, toDate }
}