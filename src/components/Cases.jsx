/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getCasesData } from "../services";
import CaseFilter from "./CaseFilter";
import { Link } from "react-router-dom";
import CasesEdit from "./Cases/CaseEdit";

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
  const [viewEditCase, setViewEditCase] = useState(false);
  const [caseEditData, setCaseEditData] = useState("");

  function handleSetPatientNameFilter(patientName) {
    setFilters((prev) => ({ ...prev, patient: patientName }));
  }

  function handleSetFilter(filterData) {
    setFilters(filterData);
  }

  function handleOpenEditCase(data) {
    setCaseEditData(data);
    setViewEditCase(true);
  }

  useEffect(() => {
    if (cases && cases.length > 0) {
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
    }
  }, [filters, cases]);

  useEffect(() => {
    getCasesData().then((response) => {
      setCases(response);
    });
  }, []);

  return (
    <div className="card">
      {caseEditData && (
        <CasesEdit
          caseEditData={caseEditData}
          viewEditCase={viewEditCase}
          setViewEditCase={setViewEditCase}
        />
      )}
      <div className="card-header d-flex justify-content-between p-3 flex-wrap gap-3">
        <TablePatientSearch
          value={filters.patient}
          setValue={handleSetPatientNameFilter}
        />

        <div className="position-relative">
          <CaseFilter
            filterObject={filterObject}
            handleSetFilter={handleSetFilter}
          />
          <button className="btn btn-light btn-sm border">
            <i className="bi bi-sort-down"></i>
          </button>
        </div>
      </div>
      <div className="card-body px-0 pt-0 pb-0">
        <div className="table-responsive">
          <table className="table table-hover table-borderless1 border-light mb-0">
            <thead className="border-bottom">
              <tr className="">
                <th className="ps-3 fw-medium">Patient</th>
                <th className="fw-medium">Doctor</th>
                <th className="fw-medium">Date</th>
                <th className="fw-medium">Status</th>
                <th className="pe-3 text-end fw-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              <TableData
                filteredCase={filteredCase}
                cases={cases}
                handleOpenEditCase={handleOpenEditCase}
              />
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer bg-white p-3 flex-wrap d-flex flex-column flex-md-row justify-content-between">
        <CardFooterDataNumber />
        <CardFooterPagenation />
      </div>
    </div>
  );
}

function TableData({ cases, filteredCase, handleOpenEditCase }) {
  const renderPlaceholder = cases.length === 0;
  const renderTable = cases.length > 0 && filteredCase.length > 0;
  const renderNotfound = cases.length > 0 && filteredCase.length === 0;

  if (renderPlaceholder) {
    return <PlaceholderData />;
  }
  if (renderTable) {
    return filteredCase.map((indCase, index) => (
      <TableRow
        key={"case" + index}
        indCase={indCase}
        handleOpenEditCase={handleOpenEditCase}
      />
    ));
  }
  if (renderNotfound) {
    return <NotFoundData />;
  }
}

function PlaceholderData() {
  const placeHolderArray = Array.from(Array(10).keys());

  return placeHolderArray.map((e) => (
    <tr key={"placeholder" + e} className="placeholder-glow">
      <td>
        <span className="placeholder col-12 rounded"></span>
      </td>
      <td>
        <span className="placeholder col-12 rounded"></span>
      </td>
      <td>
        <span className="placeholder col-12 rounded"></span>
      </td>
      <td>
        <span className="placeholder col-4 rounded-pill"></span>
      </td>
      <td className="text-end">
        <span className="placeholder col-4 rounded"></span>
      </td>
    </tr>
  ));
}

function NotFoundData() {
  return (
    <tr>
      <td colSpan="100">
        <div className="text-secondary fw-light fst-italic d-flex justify-content-center">
          <span className="mx-2">No Cases found</span>
          <span style={{ transform: "scale(-1, 1)" }}>
            <i className="bi bi-search" />
          </span>
        </div>
      </td>
    </tr>
  );
}

function TableRow({ indCase, handleOpenEditCase }) {
  return (
    <tr>
      <td className="ps-3">{indCase.patient}</td>
      <td>{indCase.doctorId}</td>
      <td>{indCase.dateOfEntery}</td>
      <td>{indCase.status}</td>
      <td className="pe-3 text-end ">
        <Link
          className="link-body-emphasis small"
          onClick={() => handleOpenEditCase(indCase)}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
      </td>
    </tr>
  );
}

function CardFooterPagenation() {
  const pageNationValueArr = ["1", "2", "3", "4"];
  const PagenationButton = ({ children }) => (
    <button
      type="button"
      className="btn btn-outline-secondary px-2  btn-sm fw-light"
    >
      {children}
    </button>
  );
  return (
    <div className="btn-group me-2 align-self-md-stretch align-self-center mt-4 mt-md-0">
      <PagenationButton>
        <i className="bi bi-caret-left" />
        <span className="d-lg-inline d-none ms-1">Previous</span>
      </PagenationButton>
      {pageNationValueArr.map((e) => (
        <PagenationButton key={"pagenationButton" + e}>{e}</PagenationButton>
      ))}
      <PagenationButton>
        <span className="d-lg-inline d-none me-1">Next</span>
        <i className="bi bi-caret-right" />
      </PagenationButton>
    </div>
  );
}

function CardFooterDataNumber() {
  const [itemPerPage, setItemPerPage] = useState(10);
  const ammountOptions = [10, 25, 50];
  return (
    <div className="small text-mute text-secondary fw-light">
      <span>Result 1-{itemPerPage} of 300 </span>
      <select
        value={itemPerPage}
        onChange={(e) => setItemPerPage(e.target.value)}
        className="form-select form-select-sm d-inline w-auto text-secondary "
      >
        {ammountOptions.map((ammount) => (
          <option key={"option" + ammount} value={ammount}>
            {ammount}
          </option>
        ))}
      </select>
    </div>
  );
}

function TablePatientSearch({ value, setValue }) {
  const [searchVal, setSearchVal] = useState(value);

  function handleFormSubmit(e) {
    e.preventDefault();
    setValue(searchVal);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="input-group">
        <button className="btn btn-sm btn-light border-top border-start border-bottom">
          <i className="bi bi-search" />
        </button>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search patient..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
    </form>
  );
}
