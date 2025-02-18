/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getDoctorsData } from "../../services";

import { Modal } from "react-bootstrap";
import ControlledTextInput from "../Inputs/ControllerTextInput";
import ControlledDropDownInput from "../Inputs/ControlledDropDownInput";
import ControlledDateInput from "../Inputs/ControlledDateInput";
import ControlledRadialGroup from "../Inputs/ControlledRadialGroup";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function CasesEdit({
  caseEditData,
  viewEditCase,
  setViewEditCase,
}) {
  const { id, dateOfEntery } = caseEditData;

  const [patient, setPatient] = useState(caseEditData.patient);
  const [doctor, setDoctor] = useState(caseEditData.doctor);
  const [birthDate, setBirthDate] = useState(caseEditData.dateOfEntery);
  const [status, setStatus] = useState(caseEditData.status);

  const [doctorList, setDoctorList] = useState([]);

  const statusArray = [
    { value: "active", id: 1 },
    { value: "done", id: 2 },
  ];

  const { t } = useTranslation();

  useEffect(() => {
    getDoctorsData().then((e) => setDoctorList(e));
  }, []);

  useEffect(() => {
    setPatient(caseEditData.patient);
    setDoctor(caseEditData.doctorId);
    setBirthDate(caseEditData.age);
    setStatus(caseEditData.status);
  }, [caseEditData]);

  function submitCases(e) {
    e.preventDefault();

    setPatient(" ");
    setDoctor(" ");
    setBirthDate(" ");
    setStatus(" ");

    handleClose();
  }

  function clearCase() {
    setPatient(" ");
    setDoctor(" ");
    setBirthDate(" ");
    setStatus(" ");

    handleClose();
  }

  function handleClose() {
    setViewEditCase(false);
  }

  const dir = i18next.dir();
  return (
    <Modal show={viewEditCase} onHide={clearCase} dir={dir}>
      <form onSubmit={submitCases} className="card">
        <div className="card-body">
          <div className="mb-3 pb-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{t("cases.edit")}</h5>
            <button className="btn-close small" onClick={clearCase} />
          </div>

          <ControlledTextInput
            title="cases.patient_name"
            value={patient}
            setValue={setPatient}
          />
          <ControlledDropDownInput
            title="cases.doctor"
            value={doctor}
            setValuen={setDoctor}
            dataList={doctorList}
            defaultSelectTitle={"cases.doctor_select"}
          />

          <ControlledDateInput
            title="cases.patient_birth_date"
            value={birthDate}
            setValue={setBirthDate}
          />

          <ControlledRadialGroup
            title="status"
            value={status}
            setValue={setStatus}
            radialsData={statusArray}
          />
        </div>

        <hr className="mx-3 my-0" />

        <div className="p-3 d-flex justify-content-stretch gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={clearCase}
          >
            {t("cancel")}
          </button>
          <button type="submit" className="btn btn-primary w-100">
            {t("submit")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
