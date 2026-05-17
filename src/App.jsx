import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Auth from "./components/Auth";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  // Check if user is already logged in on page load
  useEffect(() => {
    fetch(`${API_URL}/tasks`, {
      credentials: "include",
    })
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
        if (data) {
          setTasks(data);
        }
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
    fetch(`${API_URL}/tasks`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        setIsLoggedIn(false);
        setTasks([]);
      })
      .catch((err) => console.error(err));
  };

  const addTask = (task) => {
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const editTask = (id) => {
    const newTitle = prompt("Edit task title:");
    if (newTitle) {
      fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: newTitle }),
      })
        .then((res) => res.json())
        .then((updatedTask) => {
          setTasks(
            tasks.map((task) =>
              task._id === updatedTask._id ? updatedTask : task,
            ),
          );
        })
        .catch((err) => console.error(err));
    }
  };

  if (checking) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>My To-Do App</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
