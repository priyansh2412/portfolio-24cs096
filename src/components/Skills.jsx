function Skills() {
  const skills = [
    "React",
    "JavaScript",
    "Cybersecurity",
    "SQL"
  ];

  return (
    <section className="skills">
      <h2>Skills</h2>

      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;