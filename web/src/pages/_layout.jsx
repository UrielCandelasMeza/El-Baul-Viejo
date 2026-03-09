import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <Header variant={isAuthenticated ? "admin" : "public"} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
