import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useReducer } from "react";


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
    <>
      <h2>Todo List....</h2>

      <input
        type="text"
        placeholder="Enter todo"
        value={state.input}
        onChange={(e) =>
          dispatch({ type: "SET_INPUT", payload: e.target.value })
        }
      />

      <button onClick={() => dispatch({ type: "ADD_TODO" })}>Add</button>

      <ul>
        {state.todoList.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() =>
                dispatch({ type: "TOGGLE_TODO", payload: t.id })
              }
            />

            <span className={t.completed ? "strikeThrough" : ""}>
              {t.text}
            </span>

            <button
              onClick={() => dispatch({ type: "DELETE_TODO", payload: t.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
        

    </>
  )
}

export default App
