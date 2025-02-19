/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

export default function ControlledDateInput({
  title,
  value,
  originalValue,
  setValue,
}) {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <input
        required
        className={`form-control ${
          originalValue !== value ? "border-warning" : ""
        }`}
        type="Date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="form-text"> {t("cases.date_note")}</div>
    </div>
  );
}
