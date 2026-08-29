function Skills({ skillList }) {
  return (
    <section id="skills">
      <h2>Skills</h2>

        {skillList.map((s) => <li key={s}>{s}</li>)}

    </section>
  );
}
export default Skills;