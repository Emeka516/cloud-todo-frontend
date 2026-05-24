import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, editTask }) {
  if (tasks.length === 0) {
    return (
      <p
        className="ms-muted"
        style={{ textAlign: "center", padding: "2rem 0" }}
      >
        No tasks yet. Add one above.
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
