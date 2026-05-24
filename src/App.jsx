import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Auth from "./components/Auth";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/tasks`, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setIsLoggedIn(true);
          return res.json();
        } else {
          setIsLoggedIn(false);
          setChecking(false);
          return null;
        }
      })
      .then((data) => {
        if (data) setTasks(Array.isArray(data) ? data : []);
        setChecking(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoggedIn(false);
        setChecking(false);
      });
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetch(`${API_URL}/tasks`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" })
      .then(() => {
        setIsLoggedIn(false);
        setTasks([]);
      })
      .catch((err) => console.error(err));
  };

  const addTask = (task) => {
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks((prev) => [...prev, newTask]))
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => setTasks((prev) => prev.filter((task) => task._id !== id)))
      .catch((err) => console.error(err));
  };

  const editTask = (id) => {
    const newTitle = prompt("Edit task title:");
    if (newTitle) {
      fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: newTitle }),
      })
        .then((res) => res.json())
        .then((updatedTask) =>
          setTasks((prev) =>
            prev.map((task) =>
              task._id === updatedTask._id ? updatedTask : task,
            ),
          ),
        )
        .catch((err) => console.error(err));
    }
  };

  if (checking) {
    return (
      <div className="loading-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="fluent-card" style={{ maxWidth: 520 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "20px" }}>My Tasks</h1>
        <button className="ms-btn-secondary" onClick={handleLogout}>
          Sign out
        </button>
      </div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
