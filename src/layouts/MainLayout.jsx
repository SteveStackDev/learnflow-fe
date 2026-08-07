import { Outlet } from "react-router";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import ErrorBoundary from "~/components/ErrorBoundary/ErrorBoundary";

function MainLayout() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <ThemeToggle />
    </>
  );
}

export default MainLayout;
