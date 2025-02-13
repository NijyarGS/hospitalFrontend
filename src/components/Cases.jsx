/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { getCasesData } from "../services";
import CaseFilter from "./CaseFilter";

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [filteredCase, setFilteredCases] = useState([]);
  const filterObject = {
    patient: "",
    doctorId: "",
    beginDate: "",
    endDate: "",
    status: { open: false, close: false },
  };
  const [filters, setFilters] = useState(filterObject);
  const [filterView, setFiltersView] = useState(false);

  function handleSetFilterView(value = null) {
    value ? setFiltersView(value) : setFiltersView(!filterView);
  }

  function handleSetFilter(filterData) {
    setFilters(filterData);
  }

  useEffect(() => {
    const FinalData = cases
      .filter((e) =>
        filters.patient
          ? e.patient
              .toLocaleLowerCase()
              .includes(filters.patient.toLocaleLowerCase())
          : true
      )
      .filter((e) =>
        filters.doctor
          ? e.doctorId
              .toLocaleLowerCase()
              .includes(filters.doctor.toLocaleLowerCase())
          : true
      )
      .filter((e) =>
        filters.beginDate ? e.dateOfEntery > filters.beginDate : true
      )
      .filter((e) =>
        filters.endDate ? e.dateOfEntery < filters.endDate : true
      );

    setFilteredCases(FinalData);
  }, [filters, cases]);

  useEffect(() => {
    getCasesData().then((response) => {
      setCases(response);
    });
  }, []);

  return (
    <Fragment>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <button className="btn btn-primary btn-sm">
            <span className="me-1">Add</span>
            <i className="bi bi-plus" />
          </button>
        </div>
        <div>
          <div className="btn-group">
            <div className="position-relative">
              <button
                className="btn btn-light btn-sm"
                onClick={handleSetFilterView}
              >
                <i className="bi bi-funnel" />
              </button>
              <CaseFilter
                filterView={filterView}
                handleSetFilterView={handleSetFilterView}
                filterObject={filterObject}
                handleSetFilter={handleSetFilter}
              />
            </div>
            <button className="btn btn-light btn-sm">
              <i className="bi bi-sort-down"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="card text-bg-light">
        <div className="card-body px-0 pt-0">
          <div className="table-responsive">
            <table className="table table-hover table-borderless">
              <thead className="table-secondary">
                <tr>
                  <th className="ps-3">Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="pe-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <TableData cases={filteredCase} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function TableData({ cases }) {
  return cases && cases.length > 0
    ? cases.map((indCase, index) => (
        <TableRow key={"case" + index} indCase={indCase} />
      ))
    : null;
}

function TableRow({ indCase }) {
  return (
    <tr>
      <td className="ps-3">{indCase.patient}</td>
      <td>{indCase.doctorId}</td>
      <td>{indCase.dateOfEntery}</td>
      <td>{indCase.status}</td>
      <td className="text-end pe-3">action</td>
    </tr>
  );
}
