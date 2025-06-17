// components/search/YearSelect.jsx
export default function YearSelect({ value, onChange }) {
  const currentYear = new Date().getFullYear() + 2;
  const years = [];
  
  for (let year = currentYear; year >= 1885; year--) {
    years.push(year);
  }

  return (
    <div className="input-group">
      <label htmlFor="year">Year</label>
      <select
        id="year"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
      >
        <option value="">Select Year</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}