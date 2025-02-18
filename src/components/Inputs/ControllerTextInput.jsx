import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
export default function ControlledTextInput({ title, value, setValue }) {
  const { t } = useTranslation();
  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <input
        required
        className="form-control"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
