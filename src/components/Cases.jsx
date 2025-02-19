/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getCasesData } from "../services";
import CaseFilter from "./CaseFilter";
import { Link } from "react-router-dom";
import CasesEdit from "./Cases/CaseEdit";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [filteredCase, setFilteredCases] = useState([]);
  const [viewEditCase, setViewEditCase] = useState(false);
  const [caseEditData, setCaseEditData] = useState("");

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const filterObject = {
    patient: "",
    doctorId: "",
    beginDate: "",
    endDate: "",
    status: { active: false, done: false },
  };
  const [filters, setFilters] = useState(filterObject);

  const { t } = useTranslation();

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

  function handleSort(field) {
    setSortConfig((prev) => {
      let direction = "asc"; // Default is ascending
      if (prev.key === field && prev.direction === "asc") {
        direction = "desc"; // Toggle to descending if already ascending
      }
      return { key: field, direction };
    });
  }

  useEffect(() => {
    if (cases && cases.length > 0) {
      let FinalData = cases
        .filter((e) =>
          filters.patient
            ? e.patient
                .toLocaleLowerCase()
                .includes(filters.patient.toLocaleLowerCase())
            : true
        )
        .filter((e) =>
          filters.doctorId
            ? e.doctorId.toString() === filters.doctorId.toString()
            : true
        )
        .filter((e) =>
          filters.beginDate ? e.dateOfEntery > filters.beginDate : true
        )
        .filter((e) =>
          filters.endDate ? e.dateOfEntery < filters.endDate : true
        )
        .filter((e) => {
          if (filters.status.active && filters.status.done) {
            return true;
          } else if (filters.status.active) {
            return e.status === 1;
          } else if (filters.status.done) {
            return e.status === 2;
          } else {
            return true;
          }
        });

      if (sortConfig.key) {
        FinalData = FinalData.sort((a, b) => {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];

          if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      setFilteredCases(FinalData);
    }
  }, [filters, cases, sortConfig]);

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
            <i className="bi bi-sort-down" />
            <span
              className="d-sm-inline d-none"
              style={{ marginInlineStart: "0.25rem" }}
            >
              {t("cases.sort")}
            </span>
          </button>
        </div>
      </div>
      <div className="card-body px-0 pt-0 pb-0">
        <div className="table-responsive">
          <table className="table table-hover table-borderless1 border-light mb-0">
            <thead className="border-bottom">
              <tr className="">
                <th
                  onClick={() => handleSort("patient")}
                  className="ps-3 fw-medium"
                  style={{ cursor: "pointer" }}
                >
                  {t("cases.patient")}
                </th>
                <th
                  onClick={() => handleSort("doctorId")}
                  className="fw-medium"
                  style={{ cursor: "pointer" }}
                >
                  {t("cases.doctor")}
                </th>
                <th
                  onClick={() => handleSort("dateOfEntery")}
                  className="fw-medium"
                  style={{ cursor: "pointer" }}
                >
                  {t("date")}
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="fw-medium"
                  style={{ cursor: "pointer" }}
                >
                  {t("status")}
                </th>
                <th className="pe-3 text-end fw-medium">{t("actions")}</th>
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
  const statusNames = { 1: "active", 2: "done" };

  const { t } = useTranslation();

  return (
    <tr>
      <td className="ps-3">{indCase.patient}</td>
      <td>{indCase.doctorId}</td>
      <td>{indCase.dateOfEntery}</td>
      <td>
        <span
          className={`badge rounded-pill ${
            indCase.status == 1 ? "text-bg-primary" : "text-bg-light"
          }`}
        >
          {t("cases." + statusNames[indCase.status])}
        </span>
      </td>
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

  const { t } = useTranslation();

  const PagenationButton = ({ children }) => (
    <button
      type="button"
      className="btn btn-outline-secondary px-2  btn-sm fw-light"
    >
      {children}
    </button>
  );
  return (
    <div
      dir="ltr"
      className="btn-group me-2 align-self-md-stretch align-self-center mt-4 mt-md-0"
    >
      <PagenationButton>
        <i className="bi bi-caret-left" />
        <span className="d-lg-inline d-none ms-1">{t("previous")}</span>
      </PagenationButton>
      {pageNationValueArr.map((e) => (
        <PagenationButton key={"pagenationButton" + e}>{e}</PagenationButton>
      ))}
      <PagenationButton>
        <span className="d-lg-inline d-none me-1">{t("next")}</span>
        <i className="bi bi-caret-right" />
      </PagenationButton>
    </div>
  );
}

function CardFooterDataNumber() {
  const [itemPerPage, setItemPerPage] = useState(10);
  const ammountOptions = [10, 25, 50];

  const { t } = useTranslation();

  return (
    <div className="small text-mute text-secondary fw-light">
      <span>
        {t("footer_page_number_message", {
          firstNumber: "1",
          itemPerPage: itemPerPage,
          maxNumber: "300",
        })}
      </span>
      <select
        value={itemPerPage}
        onChange={(e) => setItemPerPage(e.target.value)}
        className="form-select form-select-sm d-inline w-auto text-secondary"
        style={{ marginInlineStart: "0.25rem" }}
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

  const { t } = useTranslation();
  const dir = i18next.dir();
  // const dir = "ltr";

  function handleFormSubmit(e) {
    e.preventDefault();
    setValue(searchVal);
  }

  return (
    <form onSubmit={handleFormSubmit} dir={dir}>
      <div className="input-group">
        <button
          className={`btn btn-sm btn-light border-top border-bottom ${
            dir === "ltr"
              ? "border-start"
              : "border-end border-start-0 rounded-start-0 rounded-end-1"
          }`}
        >
          <i className="bi bi-search" />
        </button>
        <input
          type="text"
          className={`form-control form-control-sm
            ${
              dir === "ltr"
                ? ""
                : "border-start border-end-0 rounded-start-1 rounded-end-0"
            }`}
          placeholder={t("cases.patient_search")}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
    </form>
  );
}
