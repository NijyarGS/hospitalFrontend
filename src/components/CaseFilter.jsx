/* eslint-disable react/prop-types */

import { Fragment, useEffect, useState } from "react";
import { getDoctorsData } from "../services";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-bootstrap";
import { useRef } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function CaseFilter({ filterValue, handleSetFilter }) {
  const [filterView, setFiltersView] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 575 });

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorsData().then((e) => setDoctorList(e));
  }, []);

  function handleSetFilterView(value = null) {
    value ? setFiltersView(value) : setFiltersView(!filterView);
  }

  function submitfilter(ValidData) {
    handleSetFilter(ValidData);
    handleClose();
  }

  function handleClose() {
    handleSetFilterView(false);
  }

  const { t } = useTranslation();
  const buttonRef = useRef();

  return (
    <Fragment>
      <button
        ref={buttonRef}
        className="btn btn-light btn-sm border"
        onClick={() => handleSetFilterView()}
      >
        <i className="bi bi-funnel" />
        <span
          className="d-sm-inline d-none"
          style={{ marginInlineStart: "0.25rem" }}
        >
          {t("cases.filter")}
        </span>
      </button>
      {isMobile ? (
        <FiltersPhone
          filterView={filterView}
          doctorList={doctorList}
          handleClose={handleClose}
          filterValue={filterValue}
          submitfilter={submitfilter}
        />
      ) : (
        <FiltersDesktop
          filterView={filterView}
          doctorList={doctorList}
          handleClose={handleClose}
          filterValue={filterValue}
          submitfilter={submitfilter}
          buttonRef={buttonRef}
        />
      )}
    </Fragment>
  );
}

const FiltersDesktop = ({
  filterView,
  doctorList,
  handleClose,
  filterValue,
  submitfilter,
  buttonRef,
}) => {
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  const dir = i18next.dir();

  return filterView ? (
    <div
      className={`position-absolute z-1 mt-1 ${
        dir === "rtl" ? "start-0" : "end-0"
      }`}
      ref={dropdownRef}
    >
      <div className="card">
        <FiltersMenu
          doctorList={doctorList}
          handleClose={handleClose}
          filterValue={filterValue}
          submitfilter={submitfilter}
        />
      </div>
    </div>
  ) : null;
};

const FiltersPhone = ({
  filterView,
  doctorList,
  handleClose,
  filterValue,
  submitfilter,
}) => {
  return filterView ? (
    <Modal
      show={filterView}
      onHide={handleClose}
      centered={false}
      dialogClassName={"m-0 fixed-bottom"}
      contentClassName={"border-0 custom_heigh_phone_modal rounded-bottom-0"}
    >
      <div className="card w-100 rounded-bottom-0 border-0 overflow-y-auto">
        <FiltersMenu
          handleClose={handleClose}
          doctorList={doctorList}
          filterValue={filterValue}
          submitfilter={submitfilter}
        />
      </div>
    </Modal>
  ) : null;
};

const FiltersMenu = ({
  handleClose,
  doctorList,
  filterValue,
  submitfilter,
}) => {
  const [patient, setPatient] = useState(filterValue.patient);
  const [doctor, setDoctor] = useState(filterValue.doctorId);
  const [beginDate, setBeginDate] = useState(filterValue.beginDate);
  const [endDate, setEndDate] = useState(filterValue.endDate);
  const [status, setStatus] = useState(filterValue.status);

  function handleSubmit() {
    const ValidData = {
      patient: patient,
      doctorId: doctor,
      beginDate: beginDate,
      endDate: endDate,
      status: { active: status.active, done: status.done },
    };
    submitfilter(ValidData);
  }

  function handleClear() {
    const ValidData = {
      patient: "",
      doctorId: "",
      beginDate: "",
      endDate: "",
      status: { active: false, done: false },
    };
    submitfilter(ValidData);
  }

  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="card-body">
        <div className="mb-3 pb-3 d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{t("cases.filter")}</h5>
          <button className="btn-close small" onClick={handleClose} />
        </div>
        <TextInput
          title="cases.patient"
          value={patient}
          setValue={setPatient}
        />
        <DropDownInput
          title="cases.doctor"
          value={doctor}
          setValue={setDoctor}
          doctorList={doctorList}
        />

        <div className="d-flex flex-sm-row flex-column gap-2 mb-3">
          <DateInput title="from" value={beginDate} setValue={setBeginDate} />
          <DateInput title="to" value={endDate} setValue={setEndDate} />
        </div>
        <StatusInput
          statusTypes={filterValue.status}
          title="status"
          value={status}
          setValue={setStatus}
        />
      </div>

      <hr className="mx-3 my-0" />

      <div className="p-3 d-flex flex-sm-row flex-column justify-content-stretch gap-2">
        <button
          type="submit"
          className="btn btn-outline-secondary w-100"
          onClick={handleClear}
        >
          {t("clear")}
        </button>
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleSubmit}
        >
          {t("submit")}
        </button>
      </div>
    </Fragment>
  );
};

const TextInput = ({ title, value, setValue }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <input
        className={`form-control ${value && "border-primary-subtle"}`}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const DropDownInput = ({ title, value, setValue, doctorList }) => {
  const renderDoctorList = doctorList && doctorList.length > 0;

  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label className="form-label">{t(title)}</label>
      <select
        className={`form-select ${value && "border-primary-subtle"}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">{t("cases.doctor_select")}</option>
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
  const { t } = useTranslation();

  return (
    <div className="">
      <label className="form-label">{t(title)}</label>
      <input
        className={`form-control ${value && "border-primary-subtle"}`}
        type="Date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

const StatusInput = ({ statusTypes, title, value, setValue }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="form-label">{t(title)}</label>

      <div className="d-flex flex-column align-items-start">
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

            <label className="form-check-label">{t("cases." + stat)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
