import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = (task) => {
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((err) => console.error(err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
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

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
