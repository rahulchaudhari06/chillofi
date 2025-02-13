import { useState, useEffect } from "react";

export default function TodoModal({ isOpen, toggleModal }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== "") {
      setTodos([...todos, { text, done: false }]);
    }
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3>Todo List</h3>
      <input
        type="text"
        placeholder="Add a task..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              onClick={() => toggleDone(index)}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={toggleModal}>Close</button>
    </div>
  );
}
