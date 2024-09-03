interface Props {
  fromDate: string;
  toDate: string;
  onFromDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Filter({ fromDate, toDate, onFromDateChange, onToDateChange }: Props) {
  return (
    <div>
      Range: <input type="date" value={fromDate} onChange={onFromDateChange} /> to
      <input type="date" value={toDate} onChange={onToDateChange} />
    </div>
  )
}

export default Filter
