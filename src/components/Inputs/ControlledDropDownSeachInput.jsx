/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ControlledDropDownSearchInput({
  title,
  value,
  setValue,
  originalValue,
  dataList,
  defaultSelectTitle,
}) {
  const [searchDcotors, setSearchDoctors] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(dataList);

  const renderFilteredDoctorList =
    filteredDoctors && filteredDoctors.length > 0;

  const renderEmptyFilter = filteredDoctors && filteredDoctors.length == 0;

  useEffect(() => {
    setFilteredDoctors(
      dataList.filter((doc) =>
        doc.name.toLowerCase().includes(searchDcotors.toLowerCase())
      )
    );
  }, [searchDcotors, dataList]);

  const doctorName = (id) => {
    const doctor = dataList.find((doc) => doc.id == id);
    return doctor ? doctor.name : "";
  };

  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <Dropdown>
        <Dropdown.Toggle
          className={`w-100 border bg-white text-dark ${
            value != originalValue ? "border-warning" : "border-bg-secondary"
          }`}
          style={{ textAlign: "start" }}
        >
          {
            value ? doctorName(value) : t(defaultSelectTitle) //
          }
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100 pb-0" dir="rtl">
          <Dropdown.Header>
            <input
              value={searchDcotors}
              onChange={(e) => setSearchDoctors(e.target.value)}
              className="form-control form-control-sm"
              placeholder={t("cases.doctor_search")}
            />
          </Dropdown.Header>

          <Dropdown.Divider className="mb-0" />
          <div className="overflow-y-auto py-2" style={{ maxHeight: "200px" }}>
            {renderFilteredDoctorList &&
              filteredDoctors.map((doc) => (
                <Dropdown.Item
                  style={{ textAlign: "start" }}
                  key={"docOpt" + doc.id}
                  value={doc.id}
                  active={doc.id === value}
                  onClick={() => setValue(doc.id)}
                >
                  {doc.name}
                </Dropdown.Item>
              ))}
            {renderEmptyFilter && (
              <Dropdown.Item disabled className="text-center">
                <span className="mx-2">
                  <i className="bi bi-search" />
                </span>
                {t("cases.no_doctor_found")}
              </Dropdown.Item>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
