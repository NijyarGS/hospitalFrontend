export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div
        className="bg-body-tertiary border border-1 p-sm-5 p-3 m-sm-0 m-4"
        style={{ width: "max-content" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2 className="h1 fw-bold mb-5 pb-3">Login</h2>
          <div className="mb-5 pb-3">
            <div className="form-group mb-3 pb-3">
              <label className="mb-3">Username:</label>
              <input type="text" className="form-control rounded-0" />
            </div>
            <div className="form-group mb-3 pb-3">
              <label className="mb-3">Password:</label>
              <input type="password" className="form-control rounded-0" />
            </div>
            <button className="btn btn-primary w-100 rounded-0">Login</button>
          </div>

          <p className="mb-0 small text-muted">
            Contact Supervisor in the case of forgetting your password{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
