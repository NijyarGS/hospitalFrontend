/* eslint-disable react/prop-types */

import i18next from "i18next";
import { Link } from "react-router-dom";

export default function Sidebar({ sidebarWidth }) {
  const dir = i18next.dir();

  return (
    <aside
      className={`bg-body d-md-block d-none flex-shrink-0 flex-grow-0 position-fixed top-0 bottom-0 ${
        dir === "rtl" ? "border-start" : "border-end"
      }`}
      style={{ width: sidebarWidth }}
    >
      <Link to="/login">Login</Link>

      <p>search for prepared navbar and layouting</p>
    </aside>
  );
}
