import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const CustomLayout = () => {
  return (
    <div className="layout">
      <header className="container">
        <Header />
      </header>

      <main className="container">
        <Outlet />
      </main>
      
      <footer className="container">
        <Footer />
      </footer>
    </div>
  );
};

export default CustomLayout;
