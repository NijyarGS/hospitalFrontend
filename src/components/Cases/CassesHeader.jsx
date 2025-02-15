import { Fragment, useState } from "react";
import CasesAdd from "./CasesAdd";

export default function CasesHeader() {
  const [viewAddCase, setViewAddCase] = useState(false);

  return (
    <Fragment>
      <div className="mb-4 d-flex justify-content-between">
        <h4 className="mb-0">Cases</h4>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setViewAddCase(true)}
        >
          <i className="bi bi-plus" />
          <span className="mx-1">Add Cases</span>
        </button>
      </div>
      <CasesAdd viewAddCase={viewAddCase} setViewAddCase={setViewAddCase} />
    </Fragment>
  );
}
