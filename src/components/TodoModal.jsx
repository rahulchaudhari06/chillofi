import { useState, useEffect } from "react";
import { FaTrashAlt, FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

export default function TodoModal({ isOpen, toggleModal, buttonRef }) {
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
    className="mr-20"
      style={{
        position: "absolute",
        top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + window.scrollY : "50%",
        left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left : "50%",
        transform: "translateX(-50%)",
        background: "inherit",
        color: "#f1f1f1",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        width: "300px",
        zIndex: 1000,
      }}
    >
      <h3 style={{ color: "#f1f1f1", textAlign: "center" }}>Todo List</h3>
      <input
        type="text"
        placeholder="Add a task..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(e.target.value);
            e.target.value = "";
          }
        }}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #555",
          background: "inherit",
          color: "#fff",
        }}
      />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              background: "inherit",
              borderRadius: "5px",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                onClick={() => toggleDone(index)}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  textDecoration: todo.done ? "line-through" : "none",
                  color: "#fff",
                }}
              >
                {todo.done ? <FaRegCheckCircle /> : <FaRegCircle />}
              </span>
              <span
                style={{
                  color: "#fff",
                  textDecoration: todo.done ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(index)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#f1f1f1",
              }}
            >
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={toggleModal}
        style={{
          backgroundColor: "#f44336",
          border: "none",
          padding: "10px 20px",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Close
      </button>
    </div>
  );
}
