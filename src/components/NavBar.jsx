import { useState } from "react";

function NavBar() {
  const [active, setActive] = useState("about");

  const handleClick = (section) => {
    setActive(section);
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#eee" }}>
      {["about", "skills", "projects", "footer"].map((section) => (
        <button
          key={section}
          onClick={() => handleClick(section)}
          style={{
            background: active === section ? "purple" : "transparent",
            color: active === section ? "white" : "black",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </nav>
  );
}

export default NavBar;
