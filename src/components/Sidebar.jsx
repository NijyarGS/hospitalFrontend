/* eslint-disable react/prop-types */

import i18next from "i18next";
import { NavLink, useLocation } from "react-router-dom";
import { Nav, Offcanvas, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Sidebar({
  sidebarWidth,
  isMobile,
  isSidebarDesktopOpen,
  isSidebarMobileOpen,
  toggleSidebar,
}) {
  return isMobile ? (
    <MobileNav show={isSidebarMobileOpen} toggleSidebar={toggleSidebar} />
  ) : (
    <DesktopNav
      sidebarWidth={sidebarWidth}
      isSidebarDesktopOpen={isSidebarDesktopOpen}
    />
  );
}

const MobileNav = ({ show, toggleSidebar }) => {
  const dir = i18next.dir();
  const placement = dir === "ltr" ? "start" : "end";

  return (
    <Offcanvas
      show={show}
      onHide={toggleSidebar}
      placement={placement}
      dir={dir}
      style={{ width: "280px" }}
    >
      <Offcanvas.Body>
        <div className="d-flex justify-content-between align-items-center">
          <NavHeader />
          <span onClick={toggleSidebar} className="btn-close small"></span>
        </div>

        <NavMenu />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const DesktopNav = ({ sidebarWidth, isSidebarDesktopOpen }) => {
  const dir = i18next.dir();

  return (
    <aside
      className={`bg-body d-block flex-shrink-0 flex-grow-0 position-fixed top-0 bottom-0  ${
        dir === "rtl" ? "border-start" : "border-end"
      }`}
      style={{ width: sidebarWidth }}
    >
      <div
        className=" d-flex flex-column p-3"
        style={{ alignItems: isSidebarDesktopOpen ? "" : "center" }}
      >
        <div>
          <NavHeader smallMode={!isSidebarDesktopOpen} />
        </div>
        <NavMenu smallMode={!isSidebarDesktopOpen} />
      </div>
    </aside>
  );
};

const NavHeader = ({ smallMode = false }) => {
  const { t } = useTranslation();

  return (
    <h4 className="mb-0">
      <i className="bi bi-bootstrap-fill text-primary" />
      <span
        className="text-uppercase"
        style={{
          marginInlineStart: "0.5rem",
          display: smallMode ? "none" : "",
        }}
      >
        {t("reports")}
      </span>
    </h4>
  );
};
const NavMenu = ({ smallMode = false }) => {
  return (
    <Nav className="flex-column">
      <hr className="border-top-0 border-bottom opacity-100" />
      <NavSection title={"primary"} smallMode={smallMode}>
        <NavSectionLink
          title="dashboard"
          to="/"
          icon={<i className="bi bi-speedometer" />}
          smallMode={smallMode}
        />
        <NavSectionLink
          title="home"
          to="/home"
          icon={<i className="bi bi-house-fill" />}
          smallMode={smallMode}
        />
        <NavSectionLink
          title="case_list"
          to="/cases"
          icon={<i className="bi bi-file-medical" />}
          smallMode={smallMode}
        />
      </NavSection>

      <NavSection title={"other_pages"} smallMode={smallMode}>
        <NavSectionLink
          title="login"
          to="/login"
          icon={<i className="bi bi-door-open-fill" />}
          smallMode={smallMode}
        />

        <NavSectionLink
          title="404"
          to="/missing-page"
          icon={<i className="bi bi-exclamation-triangle-fill" />}
          smallMode={smallMode}
        />
      </NavSection>
    </Nav>
  );
};

const NavSection = ({ title, children, smallMode = false }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-3 border-bottom">
      <div style={{ display: smallMode ? "none" : "" }}>
        <h6 className="text-secondary mb-3 small text-uppercase">{t(title)}</h6>
      </div>
      <div className="mb-3">{children}</div>
    </div>
  );
};

const NavSectionLink = ({ to, icon, title, smallMode = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const dir = i18next.dir();
  const toolTipPlacement = dir == "rtl" ? "left" : "right";

  const { t } = useTranslation();

  return (
    <OverlayTrigger
      placement={toolTipPlacement}
      delay={{ show: 250, hide: 100 }}
      overlay={smallMode ? <Tooltip>{t(title)}</Tooltip> : <></>}
    >
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          "d-block mb-2 p-1 px-2 fw-medium text-decoration-none rounded " +
          (isActive ? "bg-body-tertiary text-dark" : "text-body-secondary")
        }
      >
        <span
          style={{ marginInlineEnd: smallMode ? "" : "0.5rem" }}
          className={`${isActive ? "text-primary" : ""}`}
        >
          {icon}
        </span>

        <span
          className="text-capitalize small"
          style={{ display: smallMode ? "none" : "" }}
        >
          {t(title)}
        </span>
      </NavLink>
    </OverlayTrigger>
  );
};
