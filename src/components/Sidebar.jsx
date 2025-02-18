/* eslint-disable react/prop-types */

import i18next from "i18next";
import { NavLink, useLocation } from "react-router-dom";

import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Sidebar({ sidebarWidth }) {
  const dir = i18next.dir();

  const { t } = useTranslation();

  return (
    <aside
      className={`bg-body d-md-block d-none flex-shrink-0 flex-grow-0 position-fixed top-0 bottom-0 ${
        dir === "rtl" ? "border-start" : "border-end"
      }`}
      style={{ width: sidebarWidth }}
    >
      <div className=" d-flex flex-column p-3">
        <div>
          <h4 className="mb-0">
            <i className="bi bi-bootstrap-fill text-primary" />
            <span
              className="text-uppercase"
              style={{ marginInlineStart: "0.5rem" }}
            >
              {t("reports")}
            </span>
          </h4>
        </div>

        <Nav className="flex-column">
          <hr className="border-top-0 border-bottom opacity-100" />
          <NavSection title={"primary"}>
            <NavSectionLink
              title="dashboard"
              to="/"
              icon={<i className="bi bi-speedometer" />}
            />
            <NavSectionLink
              title="home"
              to="/home"
              icon={<i className="bi bi-house-fill" />}
            />
            <NavSectionLink
              title="case_list"
              to="/cases"
              icon={<i className="bi bi-file-medical" />}
            />
          </NavSection>

          <NavSection title={"other_pages"}>
            <NavSectionLink
              title="login"
              to="/login"
              icon={<i className="bi bi-door-open-fill" />}
            />

            <NavSectionLink
              title="404"
              to="/missing-page"
              icon={<i className="bi bi-exclamation-triangle-fill" />}
            />
          </NavSection>
        </Nav>
      </div>
    </aside>
  );
}

const NavSection = ({ title, children }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-3 border-bottom">
      <div>
        <h6 className="text-secondary mb-3 small text-uppercase">{t(title)}</h6>
      </div>
      <div className="mb-3">{children}</div>
    </div>
  );
};

const NavSectionLink = ({ to, icon, title }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const { t } = useTranslation();

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        "d-block mb-2 p-1 px-2 fw-medium text-decoration-none rounded " +
        (isActive ? "bg-body-tertiary text-dark" : "text-body-secondary")
      }
    >
      <span
        style={{ marginInlineEnd: "0.5rem" }}
        className={`${isActive ? "text-primary" : ""}`}
      >
        {icon}
      </span>

      <span className="text-capitalize small">{t(title)}</span>
    </NavLink>
  );
};
