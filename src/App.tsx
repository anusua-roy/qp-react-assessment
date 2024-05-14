import React, { createContext } from "react";
import "./App.css";
import { ITodo, TodoContextType } from "./interface/todo";
import TodoApp from "./components/todoApp/todoApp";

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  saveTodo: (data: ITodo) => {},
  updateTodo: (id: number) => {},
});

function App() {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: Math.random(),
      description: todo.description,
      isComplete: false,
    };
    setTodos([...todos, newTodo]);
  };
  const updateTodo = (id: number) => {
    todos.filter((todo: ITodo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        setTodos([...todos]);
        return true;
      } else {
        return false;
      }
    });
  };
  return (
    <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>
      <TodoApp />
    </TodoContext.Provider>
  );
}

export default App;
