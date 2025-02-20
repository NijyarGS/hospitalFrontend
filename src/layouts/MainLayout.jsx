import i18next from "i18next";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function MainLayout() {
  const [isSidebarDesktopOpen, setIsSidebarDesktopOpen] = useState(true);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const sidebarWidth = isSidebarDesktopOpen ? "280px" : "65px";
  // const sidebarWidth = "auto";
  const dir = i18next.dir();

  function toggleSidebar() {
    isMobile
      ? setIsSidebarMobileOpen((prev) => !prev)
      : setIsSidebarDesktopOpen((prev) => !prev);
  }

  return (
    <div
      className="h-100 d-flex flex-column justify-content-stretch bg-body-tertiary"
      dir={dir}
    >
      <Sidebar
        sidebarWidth={sidebarWidth}
        isMobile={isMobile}
        isSidebarDesktopOpen={isSidebarDesktopOpen}
        isSidebarMobileOpen={isSidebarMobileOpen}
        toggleSidebar={toggleSidebar}
      />
      <div
        className="d-flex flex-column h-100"
        style={{ marginInlineStart: isMobile ? "" : sidebarWidth }}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarDesktopOpen={isSidebarDesktopOpen}
        />
        <main className="p-md-4 p-3 h-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
