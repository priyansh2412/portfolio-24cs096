
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Auth = lazy(() => import("./components/Auth"));
import NavBar from "./components/NavBar";
const Header = lazy(() => import("./components/Header"));
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

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
<Suspense
  fallback={
    <div className="loading-fallback" role="status">
      <p>Loading page...</p>
    </div>
  }
>
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
      </Suspense>
    </>
  );
}

export default App;
