import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
export default function ControlledRadialGroup({
  title,
  value,
  setValue,
  radialsData,
}) {
  const { t } = useTranslation();
  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>

      <div className="d-flex flex-column align-items-start">
        {radialsData.map((radialOption) => (
          <div
            dir="ltr"
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
              {t("cases." + radialOption.value)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
