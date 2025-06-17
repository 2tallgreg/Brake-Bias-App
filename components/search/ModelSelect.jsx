// components/search/ModelSelect.jsx
export default function ModelSelect({ value, onChange, disabled, models }) {
  return (
    <div className="input-group">
      <label htmlFor="model">Model</label>
      <select
        id="model"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="form-input"
      >
        <option value="">Select Model</option>
        {models.map(model => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>
    </div>
  );
}