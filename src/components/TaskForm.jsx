






function TaskForm({ addTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (title) {
      addTask({ title });
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="New task" />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
