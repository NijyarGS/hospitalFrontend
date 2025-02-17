/* eslint-disable react/prop-types */
export default function ControlledRadialGroup({
  title,
  value,
  setValue,
  radialsData,
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{title}</label>

      {radialsData.map((radialOption) => (
        <div
          className="form-check"
          key={"radialOption" + radialOption.value + radialOption.id}
        >
          <input
            className="form-check-input"
            type="radio"
            id={"radioOption" + radialOption.value + radialOption.id}
            checked={value === radialOption.id}
            onChange={() => setValue(radialOption.id)}
          />

          <label
            htmlFor={"radioOption" + radialOption.value + radialOption.id}
            className="form-check-label text-capitalize"
          >
            {radialOption.value}
          </label>
        </div>
      ))}
    </div>
  );
}
