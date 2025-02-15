/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";

import { useEffect, useState } from "react";
import { getDoctorsData } from "../../services";

export default function CasesAdd({ viewAddCase, setViewAddCase }) {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  function submitfilter(e) {
    e.preventDefault();

    setPatient("");
    setDoctor("");
    setBirthDate("");
    setGender("");
    handleClose();
  }

  function clearFilter() {
    setPatient("");
    setDoctor("");
    setBirthDate("");
    setGender("");
    handleClose();
  }

  function handleClose() {
    setViewAddCase(false);
  }

  return (
    <Modal show={viewAddCase} onHide={clearFilter} backdrop="static">
      <form onSubmit={submitfilter} className="card">
        <div className="card-body">
          <div className="mb-3 pb-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Add a case</h5>
            <button className="btn-close small" onClick={clearFilter} />
          </div>
          <TextInput
            title="Patient name"
            value={patient}
            setValue={setPatient}
          />
          <DropDownInput title="Doctor" value={doctor} setValuen={setDoctor} />
          <DateInput
            title="Birth Date"
            value={birthDate}
            setValue={setBirthDate}
          />

          <GenderRadios title="Gender" value={gender} setValue={setGender} />
        </div>

        <hr className="mx-3 my-0" />

        <div className="p-3 d-flex justify-content-stretch gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={clearFilter}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

const TextInput = ({ title, value, setValue }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{title}</label>

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

const DropDownInput = ({ title, value, setValue }) => {
  const [doctorList, setDoctorList] = useState([]);
  const renderDoctorList = doctorList && doctorList.length > 0;

  useEffect(() => {
    getDoctorsData().then((e) => setDoctorList(e));
  }, []);

  return (
    <div className="mb-3">
      <label className="form-label">{title}</label>
      <select
        className="form-select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      >
        <option value="" hidden>
          Select a doctor
        </option>
        {renderDoctorList &&
          doctorList.map((doc) => (
            <option key={"docOpt" + doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
      </select>
    </div>
  );
};

const DateInput = ({ title, value, setValue }) => {
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
};

const GenderRadios = ({ title, value, setValue }) => {
  const genders = ["male", "female"];

  return (
    <div>
      <label className="form-label">{title}</label>

      {genders.map((gender) => (
        <div className="form-check" key={"gender" + gender}>
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
            {gender}
          </label>
        </div>
      ))}
    </div>
  );
};
