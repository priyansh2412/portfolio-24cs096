
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import NavBar from "./components/NavBar";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Auth from "./components/Auth";

function App() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || ""
  );

  const handleLogin = (newToken, user) => {
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken("");
  };

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <About />
              <Skills />
              <Projects
                token={token}
                onLogout={handleLogout}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/projects"
          element={
            <>
              <Header />
              <Projects
                token={token}
                onLogout={handleLogout}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            token
              ? <Navigate to="/projects" replace />
              : <Auth onLogin={handleLogin} />
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
