import { Outlet } from "react-router";
import { ToastProvider } from "~/context/ToastContext.jsx";
import ToastContainer from "~/components/Toast/ToastContainer.jsx";
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import ErrorBoundary from "~/components/ErrorBoundary/ErrorBoundary";

function MainLayout() {
  return (
    <ToastProvider>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <ThemeToggle />
      <ToastContainer />
    </ToastProvider>
  );
}

export default MainLayout;
