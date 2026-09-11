import { useEffect, useState } from "react";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRepos = () => {
    setLoading(true);
    setError(null);

    fetch("https://api.github.com/users/priyansh2412/repos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section className="projects">
        <h2>Projects</h2>
        <p className="loading">Loading repositories...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects">
        <h2>Projects</h2>
        <p className="error">Error: {error}</p>
        <button className="retry-button" onClick={fetchRepos}>
          Retry
        </button>
      </section>
    );
  }

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="projects">
      <h2>GitHub Projects</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="project-list">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div className="project-card" key={repo.id}>
              <h3>{repo.name}</h3>

              <p>
                {repo.description || "No description available."}
              </p>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="repo-link"
              >
                View Repository
              </a>
            </div>
          ))
        ) : (
          <p className="no-results">No repositories found.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;