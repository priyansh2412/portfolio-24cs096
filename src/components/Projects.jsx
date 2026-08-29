function Projects() {
  const projects = [
    { title: "Portfolio Website", description: "Built with React and Vite." },
    { title: "Cybersecurity Lab", description: "Experiments with OWASP ZAP and Wireshark." },
    { title: "SQL Database Manager", description: "Student records management system." }
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      <ul>
        {projects.map((p, i) => (
          <li key={i}><strong>{p.title}</strong>: {p.description}</li>
        ))}
      </ul>
    </section>
  );
}
export default Projects;