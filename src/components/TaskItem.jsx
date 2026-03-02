function TaskItem({ task, deleteTask, editTask }) {
  return (
    <li>
      <span>{task.title}</span>
      <button onClick={() => editTask(task._id)}>Edit</button>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
