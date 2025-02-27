import i18next from "i18next";

/* eslint-disable react/prop-types */
export default function Header({ toggleSidebar, isSidebarDesktopOpen }) {
  const dir = i18next.dir();

  return (
    <header className="bg-body py-3 px-4 container-fluid border-bottom">
      <section className="d-flex justify-content-between align-items-center">
        <div>
          <a
            className={`p-0 h4 ${
              isSidebarDesktopOpen ? "link-body-emphesis" : "link-primary"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => toggleSidebar()}
          >
            <MenuIcon isSidebarDesktopOpen={isSidebarDesktopOpen} dir={dir} />
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

const MenuIcon = ({ dir, isSidebarDesktopOpen }) =>
  dir === "rtl" ? (
    isSidebarDesktopOpen ? (
      <i className="bi bi-layout-sidebar-reverse" />
    ) : (
      <i className="bi bi-layout-sidebar-inset-reverse" />
    )
  ) : isSidebarDesktopOpen ? (
    <i className="bi bi-layout-sidebar" />
  ) : (
    <i className="bi bi-layout-sidebar-inset" />
  );
