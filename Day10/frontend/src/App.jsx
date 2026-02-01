import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { getTasks, addTask, updateTask, deleteTask } from './services/api';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Tasks (GET)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // 2. Add Task (POST) - Passed to AddTask component
  const handleAddTask = async (title) => {
    try {
      // Optimistic update (optional, but let's stick to simple first: wait for server)
      const { data } = await addTask({ title });
      setTasks([...tasks, data]); // Local state update
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  // 3. Toggle Task (PUT) - Passed to TaskList -> TaskItem
  const handleToggleTask = async (id, currentStatus) => {
    try {
      // Optimistic update for removing lag
      setTasks(tasks.map(t => t._id === id ? { ...t, isCompleted: !currentStatus } : t));

      await updateTask(id, { isCompleted: !currentStatus });
    } catch (error) {
      console.error("Error updating task", error);
      fetchTasks(); // Revert on error
    }
  };

  // 4. Delete Task (DELETE) - Passed to TaskList -> TaskItem
  const handleDeleteTask = async (id) => {
    try {
      setTasks(tasks.filter(t => t._id !== id)); // Optimistic UI
      await deleteTask(id);
    } catch (error) {
      console.error("Error deleting task", error);
      fetchTasks();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setTasks([]);
  };

  if (!token) return <Auth onLogin={() => setToken(localStorage.getItem('token'))} />;

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <AddTask onAdd={handleAddTask} />

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
