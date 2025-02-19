export default function Header() {
  return (
    <header className="bg-body p-3 container-fluid border-bottom">
      <section className="d-flex justify-content-between align-items-center">
        <div>
          <a className="p-0 link-primary h4" style={{ cursor: "pointer" }}>
            <i className="bi bi-layout-sidebar" />
            {
              //  <i className="bi bi-layout-sidebar-reverse"/>
              // <i className="bi bi-layout-sidebar-inset"/>
              // <i className="bi bi-layout-sidebar-inset-reverse"/>
            }
          </a>
        </div>

        <div>
          <a
            className="p-0 link-body-emphasis h4"
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-person-circle" />
          </a>
        </div>
      </section>
    </header>
  );
}
