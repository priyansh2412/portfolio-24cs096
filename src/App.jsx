import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import "./App.css";
function App() {
  const skills = ["React", "JavaScript", "Cybersecurity", "SQL"];

  return (
    <div>
      <NavBar />
      <Header name="Priyansh Sukhadia" themeColor="purple" />
      <About />
      <Skills skillList={skills} />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
