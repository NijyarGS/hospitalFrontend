/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getDoctorsData } from "../../services";

import { Modal } from "react-bootstrap";
import ControlledTextInput from "../Inputs/ControllerTextInput";
import ControlledDropDownInput from "../Inputs/ControlledDropDownInput";
import ControlledDateInput from "../Inputs/ControlledDateInput";
import ControlledRadialGroup from "../Inputs/ControlledRadialGroup";

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
    { value: "Active", id: 1 },
    { value: "Done", id: 2 },
  ];

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

  return (
    <Modal show={viewEditCase} onHide={clearCase}>
      <form onSubmit={submitCases} className="card">
        <div className="card-body">
          <div className="mb-3 pb-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Edit case</h5>
            <button className="btn-close small" onClick={clearCase} />
          </div>

          <ControlledTextInput
            title="Patient name"
            value={patient}
            setValue={setPatient}
          />
          <ControlledDropDownInput
            title="Doctor"
            value={doctor}
            setValuen={setDoctor}
            dataList={doctorList}
            defaultSelectTitle={"Select a doctor"}
          />

          <ControlledDateInput
            title="Birth Date"
            value={birthDate}
            setValue={setBirthDate}
          />

          <ControlledRadialGroup
            title="Status"
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
