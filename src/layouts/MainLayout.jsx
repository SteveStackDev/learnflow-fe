import { Outlet } from "react-router";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ThemeToggle />
    </>
  );
}

export default MainLayout;
