
const BASE_URL = "http://localhost:5000";

const apiRequest = async (path, options = {}) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    window.dispatchEvent(new Event("auth:unauthorized"));

    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      (data.errors && Object.values(data.errors).join(", ")) ||
      "Request failed"
    );
  }

  return data;
};

export const getTasks = () => apiRequest("/tasks");

export const createTask = (task) =>
  apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });

export const updateTask = (id, task) =>
  apiRequest(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });

export const deleteTask = (id) =>
  apiRequest(`/tasks/${id}`, {
    method: "DELETE",
  });
export const generateTaskDescription = (title) =>
  apiRequest("/api/ai/generate-description", {
    method: "POST",
    body: JSON.stringify({ title }),
  });