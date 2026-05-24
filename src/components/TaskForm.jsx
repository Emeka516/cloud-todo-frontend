function TaskForm({ addTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    if (title) {
      addTask({ title });
      e.target.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}
    >
      <input
        className="ms-input"
        name="title"
        placeholder="Add a new task..."
        style={{ flex: 1 }}
      />
      <button className="ms-btn-primary" type="submit">
        + Add
      </button>
    </form>
  );
}

export default TaskForm;
