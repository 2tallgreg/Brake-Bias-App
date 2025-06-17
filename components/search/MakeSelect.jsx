// components/search/MakeSelect.jsx
import { vehicleDatabase } from '@/lib/constants';

export default function MakeSelect({ value, onChange, disabled, year }) {
  const makes = Object.keys(vehicleDatabase).sort();

  return (
    <div className="input-group">
      <label htmlFor="make">Make</label>
      <select
        id="make"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="form-input"
      >
        <option value="">Select Make</option>
        {makes.map(make => (
          <option key={make} value={make}>{make}</option>
        ))}
      </select>
    </div>
  );
}