import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPlusSquare } from "react-icons/bs";

export type TodoType = {
  id: number;
  title: string;
  done: boolean;
  thumbnail: string;
};

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const getData = async () => {
    const response = await axios.get(`/api/todos`);
    setTodos(response.data.todos);
  };

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const formData = new FormData();

    formData.append("todoData", input);

    if (file) {
      formData.append("file", file);
    }

    const response = await axios.post(`/api/todos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setTodos((prev) => [...prev, response.data]);
    setInput("");
    setFile(null);
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id: number) => {
    const response = await axios.put(`/api/todos/${id}`);
    setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-pink-400 font-semibold text-4xl mb-4">TODO List</h1>
      <form onSubmit={createTodo} className="flex mb-4">
        <div className="flex flex-col">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="border-solid border-2 border-pink-500 rounded-md w-68 h-8 pl-2"
          ></input>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files![0]);
            }}
            placeholder="hhh"
            className="mt-2"
          ></input>
        </div>
        <button
          type="submit"
          className="w-8 h-8 ml-4 flex justify-center items-center rounded-md"
        >
          <BsPlusSquare size="32" color="hotpink" />
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="h-8 flex items-center mb-2">
            <img
              src={todo.thumbnail}
              alt="thumbnail"
              className="w-8 h-8 mr-2 rounded-full"
            />
            <span className="w-60 h-full flex items-center border-b border-pink-100 pl-2">
              {todo.title}
            </span>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => updateTodo(todo.id)}
              className="ml-2"
            ></input>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 flex justify-center items-center rounded-lg"
            >
              <RiDeleteBinLine size="17" color="hotpink" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
