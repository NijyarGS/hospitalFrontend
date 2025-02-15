/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { getDoctorsData } from "../services";

export default function CaseFilter({
  filterView,
  handleSetFilterView,
  filterObject,
  handleSetFilter,
}) {
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
    handleClose();
  }
  function clearFilter() {
    const ValidData = {
      patient: "",
      doctorId: "",
      beginDate: "",
      endDate: "",
      status: { open: false, close: false },
    };
    handleSetFilter(ValidData);
    handleClose();
  }

  function handleClose() {
    handleSetFilterView(false);
  }

  return (
    filterView && (
      <div className="position-absolute z-1 mt-1 end-0">
        <div className="card w-100">
          <div className="card-body">
            <div className="mb-3 pb-3 d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Filter</h5>
              <button className="btn-close small" onClick={handleClose} />
            </div>
            <TextInput title="Patient" value={patient} setValue={setPatient} />
            <DropDownInput title="Doctor" value={doctor} setValue={setDoctor} />

            <div className="d-flex gap-2 mb-3">
              <DateInput
                title="From"
                value={beginDate}
                setValue={setBeginDate}
              />
              <DateInput title="To" value={endDate} setValue={setEndDate} />
            </div>
            <StatusInput
              statusTypes={filterObject.status}
              title="Status"
              value={status}
              setValue={setStatus}
            />
          </div>

          <hr className="mx-3 my-0" />

          <div className="p-3 d-flex justify-content-stretch gap-2">
            <button
              type="submit"
              className="btn btn-outline-secondary w-100"
              onClick={clearFilter}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={submitfilter}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
}

const TextInput = ({ title, value, setValue }) => {
  return (
    <div className="mb-3">
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
      >
        <option value="">Select a doctor</option>
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
