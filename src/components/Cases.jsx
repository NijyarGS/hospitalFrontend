import { Fragment } from "react";

export default function Cases() {
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
            <button className="btn btn-light btn-sm">
              <i className="bi bi-funnel"></i>
            </button>
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
                  <th className="pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <TableData />
                <TableData />
                <TableData />
                <TableData />
                <TableData />
                <TableData />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function TableData() {
  return (
    <tr>
      <td className="ps-3">lorem</td>
      <td>lorem</td>
      <td>1/1/2001</td>
      <td>Done</td>
      <td className="pe-3">action</td>
    </tr>
  );
}
