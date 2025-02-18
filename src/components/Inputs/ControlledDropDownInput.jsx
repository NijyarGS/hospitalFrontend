/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

export default function ControlledDropDownInput({
  title,
  value,
  setValue,
  dataList,
  defaultSelectTitle,
}) {
  const renderDataList = dataList && dataList.length > 0;

  const { t } = useTranslation();
  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <select
        className="form-select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      >
        <option value="" hidden>
          {t(defaultSelectTitle)}
        </option>
        {renderDataList &&
          dataList.map((data) => (
            <option key={"dropDownOption" + data.id} value={data.id}>
              {data.name}
            </option>
          ))}
      </select>
    </div>
  );
}
