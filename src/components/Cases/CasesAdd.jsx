/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";

import { useEffect, useState } from "react";
import { getDoctorsData } from "../../services";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import DropDownSearchInput from "../Inputs/DropDownSeachInput";

export default function CasesAdd({ viewAddCase, setViewAddCase }) {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorsData().then((e) => setDoctorList(e));
  }, []);

  function submitCase(e) {
    e.preventDefault();

    setPatient("");
    setDoctor("");
    setBirthDate("");
    setGender("");
    handleClose();
  }

  function clearCase() {
    setPatient("");
    setDoctor("");
    setBirthDate("");
    setGender("");
    handleClose();
  }

  function handleClose() {
    setViewAddCase(false);
  }
  const { t } = useTranslation();
  const dir = i18next.dir();

  return (
    <Modal
      show={viewAddCase}
      onHide={clearCase}
      backdrop="static"
      dir={dir}
      centered
    >
      <form onSubmit={submitCase} className="card">
        <div className="card-body">
          <div className="mb-3 pb-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{t("cases.add")}</h5>
            <button className="btn-close small" onClick={clearCase} />
          </div>
          <TextInput
            title="cases.patient_name"
            value={patient}
            setValue={setPatient}
          />

          <DropDownSearchInput
            title="cases.doctor"
            value={doctor}
            setValue={setDoctor}
            doctorList={doctorList}
          />
          <DateInput
            title="cases.patient_birth_date"
            value={birthDate}
            setValue={setBirthDate}
          />

          <GenderRadios
            title="cases.gender"
            value={gender}
            setValue={setGender}
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

const TextInput = ({ title, value, setValue }) => {
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
};

const DateInput = ({ title, value, setValue }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <input
        required
        className="form-control"
        type="Date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="form-text"> {t("cases.date_note")}</div>
    </div>
  );
};

const GenderRadios = ({ title, value, setValue }) => {
  const genders = ["male", "female"];

  const { t } = useTranslation();
  const dir = i18next.dir();
  return (
    <div>
      <label className="form-label">{t(title)}</label>

      <div className="d-flex flex-column" style={{ alignItems: "start" }}>
        {genders.map((gender) => (
          <div className="form-check d-inline" key={"gender" + gender}>
            <input
              className="form-check-input"
              type="radio"
              id={"genderRadio" + gender}
              checked={value === gender}
              onChange={() => setValue(gender)}
            />

            <label
              htmlFor={"genderRadio" + gender}
              className="form-check-label text-capitalize"
            >
              {t("cases." + gender)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
