/* eslint-disable react/prop-types */

export default function ControlledDateInput({ title, value, setValue }) {
  return (
    <div className="mb-3">
      <label className="form-label">{title}</label>
      <input
        required
        className="form-control"
        type="Date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
