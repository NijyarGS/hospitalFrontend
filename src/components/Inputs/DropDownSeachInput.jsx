/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function DropDownSearchInput({
  title,
  value,
  setValue,
  doctorList,
  outerGlow = false,
}) {
  const [searchDcotors, setSearchDoctors] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorList);

  const renderFilteredDoctorList =
    filteredDoctors && filteredDoctors.length > 0;

  const renderEmptyFilter = filteredDoctors && filteredDoctors.length == 0;

  useEffect(() => {
    setFilteredDoctors(
      doctorList.filter((doc) =>
        doc.name.toLowerCase().includes(searchDcotors.toLowerCase())
      )
    );
  }, [searchDcotors, doctorList]);

  const doctorName = (id) => {
    const doctor = doctorList.find((doc) => doc.id == id);
    return doctor ? doctor.name : "";
  };

  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <Dropdown>
        <Dropdown.Toggle
          className={`w-100 border bg-white text-dark ${
            value && outerGlow ? "border-primary-subtle" : "border-bg-secondary"
          }`}
          style={{ textAlign: "start" }}
        >
          {
            value ? doctorName(value) : t("cases.doctor_select") //
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
