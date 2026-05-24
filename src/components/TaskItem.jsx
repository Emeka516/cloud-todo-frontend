function TaskItem({ task, deleteTask, editTask }) {
  return (
    <li className="task-item">
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "1.5px solid #8a8886",
          flexShrink: 0,
        }}
      />
      <span>{task.title}</span>
      <div className="task-actions">
        <button className="ms-btn-ghost" onClick={() => editTask(task._id)}>
          Edit
        </button>
        <button
          className="ms-btn-ghost danger"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
