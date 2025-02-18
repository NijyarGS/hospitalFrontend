import i18next from "i18next";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const sidebarWidth = "280px";

  const dir = i18next.dir();

  return (
    <div
      className="h-100 d-flex flex-column justify-content-stretch bg-body-tertiary"
      dir={dir}
    >
      <Sidebar sidebarWidth={sidebarWidth} />
      <div className="d-flex flex-column h-100 custom_margin_start">
        <Header />
        <main className="p-md-4 p-3 h-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
