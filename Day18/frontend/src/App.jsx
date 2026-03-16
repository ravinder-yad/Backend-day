import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/asks";

const initialForm = {
  title: "",
  description: "",
  category: "general",
  priority: "medium",
  status: "pending",
  createdBy: "",
  dueDate: "",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Tasks load nahi ho pa rahe.");
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Backend se connect nahi ho pa raha.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title aur description required hain.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        createdBy: form.createdBy.trim(),
        dueDate: form.dueDate || undefined,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Task create nahi ho saka.");
      }

      setTasks((current) => [data, ...current]);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Task save nahi hua.");
    } finally {
      setSaving(false);
    }
  };

  const updateTaskStatus = async (task, nextStatus) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Task update nahi hua.");
      }

      setTasks((current) =>
        current.map((item) => (item._id === task._id ? data : item))
      );
    } catch (err) {
      setError(err.message || "Status update nahi hua.");
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Task delete nahi hua.");
      }

      setTasks((current) => current.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message || "Task delete nahi hua.");
    }
  };

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Day 18 Task Manager</p>
        <h1>Apne tasks ko simple tareeke se manage karo.</h1>
        <p className="hero-copy">
          Backend MongoDB se connected hai aur yahin se naye task add, status update
          aur delete ho sakte hain.
        </p>
      </section>

      <section className="content-grid">
        <form className="task-form card" onSubmit={handleSubmit}>
          <div className="section-head">
            <h2>New Task</h2>
            <span>{saving ? "Saving..." : "Ready"}</span>
          </div>

          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Landing page fix"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Kya karna hai, yahan likho"
            />
          </label>

          <div className="split">
            <label>
              Category
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="general"
              />
            </label>

            <label>
              Priority
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>

          <div className="split">
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <label>
              Due Date
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Created By
            <input
              name="createdBy"
              value={form.createdBy}
              onChange={handleChange}
              placeholder="Acer"
            />
          </label>

          <button type="submit" className="primary-btn" disabled={saving}>
            {saving ? "Adding..." : "Add Task"}
          </button>
        </form>

        <section className="card">
          <div className="section-head">
            <h2>Task List</h2>
            <button className="ghost-btn" onClick={fetchTasks} type="button">
              Refresh
            </button>
          </div>

          {error ? <p className="message error">{error}</p> : null}
          {loading ? <p className="message">Tasks load ho rahe hain...</p> : null}

          {!loading && tasks.length === 0 ? (
            <p className="message">Abhi koi task nahi hai. Pehla task add karo.</p>
          ) : null}

          <div className="task-list">
            {tasks.map((task) => (
              <article key={task._id} className="task-card">
                <div className="task-top">
                  <div>
                    <p className="task-category">{task.category || "general"}</p>
                    <h3>{task.title}</h3>
                  </div>
                  <span className={`badge ${task.priority}`}>{task.priority}</span>
                </div>

                <p className="task-desc">{task.description}</p>

                <div className="task-meta">
                  <span>Status: {task.status}</span>
                  <span>By: {task.createdBy || "Unknown"}</span>
                  <span>
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "NA"}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={() =>
                      updateTaskStatus(
                        task,
                        task.status === "completed" ? "pending" : "completed"
                      )
                    }
                  >
                    {task.status === "completed" ? "Mark Pending" : "Mark Complete"}
                  </button>

                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
