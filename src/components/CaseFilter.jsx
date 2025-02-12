/* eslint-disable react/prop-types */

import { useState } from "react";

export default function CaseFilter({ filterObject, handleSetFilter }) {
  const [patient, setPatient] = useState(filterObject.patient);
  const [doctor, setDoctor] = useState(filterObject.doctor);
  const [beginDate, setBeginDate] = useState(filterObject.beginDate);
  const [endDate, setEndDate] = useState(filterObject.endDate);

  const [status, setStatus] = useState(filterObject.status);

  function submitfilter() {
    const ValidData = {
      patient: patient,
      doctorId: doctor,
      beginDate: beginDate,
      endDate: endDate,
      status: { open: status.open, close: status.close },
    };
    handleSetFilter(ValidData);
  }

  return (
    <div style={{ maxWidth: "300px" }}>
      <TextInput title="Patient" value={patient} setValue={setPatient} />
      <TextInput
        title="Doctor (convert to drop down)"
        value={doctor}
        setValue={setDoctor}
      />
      <DateInput title="From" value={beginDate} setValue={setBeginDate} />
      <DateInput title="To" value={endDate} setValue={setEndDate} />
      <StatusInput
        statusTypes={filterObject.status}
        title="Status"
        value={status}
        setValue={setStatus}
      />
      <button type="submit" className="btn btn-primary" onClick={submitfilter}>
        Submit
      </button>
    </div>
  );
}

const TextInput = ({ title, value, setValue }) => {
  return (
    <div className="">
      <label className="form-label">{title}</label>
      <input
        className="form-control"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const DateInput = ({ title, value, setValue }) => {
  return (
    <div className="">
      <label className="form-label">{title}</label>
      <input
        className="form-control"
        type="Date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const StatusInput = ({ statusTypes, title, value, setValue }) => {
  return (
    <div>
      <label className="form-label">{title}</label>

      {Object.keys(statusTypes).map((stat) => (
        <div className="form-check" key={"status" + stat}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={value[stat]}
            onChange={(elem) =>
              setValue((prev) => ({ ...prev, [stat]: elem.target.checked }))
            }
          />

          <label className="form-check-label">{stat}</label>
        </div>
      ))}
    </div>
  );
};
