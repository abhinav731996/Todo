import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useReducer } from "react"

const initialState = {
  input: "",
  todoList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        input: action.payload,
      };

    case "ADD_TODO": {
      if (state.input.trim() === "") return state;

      const newItem = {
        id: state.todoList.length + 1,
        text: state.input.trim(),
        completed: false,
      };

      return {
        ...state,
        todoList: [...state.todoList, newItem],
        input: "",
      };
    }

    case "TOGGLE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todoList: state.todoList.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="container mt-5 todo-container">
      <div className="card shadow-lg p-4 todo-card">
        <h2 className="text-center mb-4 fw-bold text-primary">
          Todo List App
        </h2>

        {/* Input Section */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your todo..."
            value={state.input}
            onChange={(e) =>
              dispatch({ type: "SET_INPUT", payload: e.target.value })
            }
          />

          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "ADD_TODO" })}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        {state.todoList.length === 0 ? (
          <p className="text-center text-muted">No todos added yet </p>
        ) : (
          <ul className="list-group">
            {state.todoList.map((t) => (
              <li
                key={t.id}
                className="list-group-item d-flex justify-content-between align-items-center todo-item"
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={t.completed}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_TODO", payload: t.id })
                    }
                  />

                  <span className={t.completed ? "strikeThrough" : "todo-text"}>
                    {t.text}
                  </span>
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: t.id })
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
