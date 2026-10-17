import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api";

function Projects({ token, onLogout }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    completed: false,
  });

  const [editingId, setEditingId] = useState(null);

  const [toast, setToast] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (!token) {
    navigate("/login", { replace: true });
    return;
  }

  fetchTasks();
}, [token, navigate]);

useEffect(() => {
  const handleUnauthorized = () => {
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

  window.addEventListener("auth:unauthorized", handleUnauthorized);

  return () => {
    window.removeEventListener("auth:unauthorized", handleUnauthorized);
  };
}, [navigate, onLogout]);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Show toast
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setActionError("Title is required");
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      if (editingId) {
        const updatedTask = await updateTask(editingId, form);

        setTasks(
          tasks.map((task) =>
            task._id === editingId ? updatedTask : task
          )
        );

        showToast("Task updated successfully");
        setEditingId(null);
      } else {
        const newTask = await createTask(form);

        setTasks([...tasks, newTask]);

        showToast("Task created successfully");
      }

      setForm({
        title: "",
        description: "",
        priority: "medium",
        completed: false,
      });
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Start editing
  const handleEdit = (task) => {
    setEditingId(task._id);

    setForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority || "medium",
      completed: task.completed || false,
    });

    setActionError(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      title: "",
      description: "",
      priority: "medium",
      completed: false,
    });

    setActionError(null);
  };

  // Delete task
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      await deleteTask(id);

      setTasks(tasks.filter((task) => task._id !== id));

      showToast("Task deleted successfully");
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  // Initial loading
  if (loading) {
    return (
      <section className="projects">
        <h2>Tasks</h2>
        <p className="loading">Loading tasks...</p>
      </section>
    );
  }

  // Initial fetch error
  if (error) {
    return (
      <section className="projects">
        <h2>Tasks</h2>

        <p className="error">Error: {error}</p>

        <button className="retry-button" onClick={fetchTasks}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="projects">
      <h2>Task Manager</h2>

      {/* Toast notification */}
      {toast && <div className="toast">{toast}</div>}

      {/* Create / Update Form */}
      <form className="task-form" onSubmit={handleSubmit}>
        <h3>{editingId ? "Update Task" : "Create Task"}</h3>

        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          Completed
        </label>

        <button type="submit" disabled={actionLoading}>
          {actionLoading
            ? "Processing..."
            : editingId
            ? "Update Task"
            : "Create Task"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            disabled={actionLoading}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Action error */}
      {actionError && (
        <p className="error">
          Error: {actionError}
        </p>
      )}

      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Task List */}
      <div className="project-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div className="project-card" key={task._id}>
              <h3>{task.title}</h3>

              <p>
                {task.description || "No description available."}
              </p>

              <p>
                <strong>Priority:</strong> {task.priority}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {task.completed ? "Completed" : "Pending"}
              </p>

              <div className="task-actions">
                <button
                  onClick={() => handleEdit(task)}
                  disabled={actionLoading}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  disabled={actionLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No tasks found.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;