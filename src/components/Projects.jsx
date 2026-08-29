function Projects() {
  const projects = [
    { title: "Portfolio Website", description: "A personal portfolio built with React and Vite." },
    { title: "Cybersecurity Lab", description: "Hands-on experiments with OWASP ZAP and Wireshark." },
    { title: "SQL Database Manager", description: "Mini project for managing student records using SQL." }
  ];

  return (
    <section>
      <h2>Projects</h2>
      <ul>
        {projects.map((p, index) => (
          <li key={index}>
            <strong>{p.title}</strong>: {p.description}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;
