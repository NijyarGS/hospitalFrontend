import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const sidebarWidth = "280px";

  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <div className="h-100 position-relative ">
        <Sidebar sidebarWidth={sidebarWidth} />
        <main className="p-md-4 p-3 custom_margin_start h-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
