/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function Sidebar({ sidebarWidth }) {
  return (
    <aside
      className="bg-body d-md-block d-none flex-shrink-0 flex-grow-0 position-fixed top-0 bottom-0 border-end"
      style={{ width: sidebarWidth }}
    >
      <Link to="/login">Login</Link>

      <p>search for prepared navbar and layouting</p>
    </aside>
  );
}
