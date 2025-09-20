import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [titleContent, setTitleContent] = useState("");
  const [descriptionContent, setDescriptionContent] = useState("");
  const [notification, setNotification] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(0);
  const [currentTodo, setCurrentTodo] = useState(
    todos.filter((todo) => todo.todoId === currentTodoId)
  );
  const [editTitleContent, setEditTitleContent] = useState(currentTodo.title);
  const [editDescriptionContent, setEditDescriptionContent] = useState(
    currentTodo.description
  );

  async function getTodos() {
    const res = await axios.get("http://localhost:3333/api/todos");
    console.log(res);
    setTodos(res.data);
  }

  useEffect(() => {
    getTodos();
  }, [notification]);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const newTodo = { title, description };
    if (title === "") return setNotification("Invalid input!");
    if (description === "") return setNotification("Invalid input!");
    try {
      const res = await axios.post("http://localhost:3333/api/todos/", newTodo);
      setTitleContent("");
      setDescriptionContent("");
      if (res.status === 200) {
        setNotification("Success!");
      } else {
        setNotification("Failed! :(");
      }
    } catch (error) {
      setNotification("Failed! :(");
    }
  }

  async function handleDelete(todoId) {
    console.log("running delete function");
    try {
      const res = await axios.delete(
        `http://localhost:3333/api/todos/todo/${todoId}`
      );
      if (res.status === 200) {
        setNotification("Success!");
      } else {
        setNotification("Failed! :(");
      }
    } catch (error) {
      setNotification("Failed! :(");
    }
  }

  return (
    <div className="flex flex-col mx-auto p-10">
      <main className="flex-1 mx-auto">
        <h1 className="text-6xl font-bold text-green-500 text-center">
          Best Todo App
        </h1>
        <h2 className="text-center pt-10 pb-3 font-bold text-green-500">
          Create New Todo
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[300px] mx-auto"
        >
          <input
            id="title"
            name="title"
            type="text"
            value={titleContent}
            onChange={(e) => setTitleContent(e.target.value)}
            className="border px-2 py-1 rounded"
            placeholder="Title"
          />
          <input
            id="description"
            name="description"
            type="text"
            value={descriptionContent}
            onChange={(e) => setDescriptionContent(e.target.value)}
            className="border px-2 py-1 mt-2 rounded"
            placeholder="Description"
          />
          <button className="border bg-green-500 text-white rounded my-3 p-2 cursor-pointer hover:bg-green-400 hover:text-green-800 transition-all ease-in-out duration-300 font-bold">
            CREATE
          </button>
        </form>
        <p
          className={`${
            notification === "Success!" ? "text-green-500" : "text-red-500"
          } text-center font-bold`}
        >
          {notification}
        </p>
        <h2 className="text-left pt-5 pb-3 font-bold text-green-500">
          All Todos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <div className="flex my-5 mx-5" key={todo.todoId}>
              <div
                className={`flex-1 ${
                  editMode && currentTodoId === todo.todoId && "flex flex-col"
                }`}
              >
                {editMode && currentTodoId === todo.todoId ? (
                  <div className="p-3 bg-green-500 text-white text-xl font-bold rounded-tl-sm w-[200px] truncate">
                    <input
                      type="text"
                      className="border"
                      value={editTitleContent}
                      onChange={(e) => setEditTitleContent(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-green-500 text-white text-xl font-bold rounded-tl-sm w-[200px] truncate">
                    {todo.title}
                  </div>
                )}
                {editMode && currentTodoId === todo.todoId ? (
                  <div className="p-3 bg-gray-300 w-[200px] truncate">
                    <input
                      type="text"
                      className="border"
                      value={editDescriptionContent}
                      onChange={(e) =>
                        setEditDescriptionContent(e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-gray-300 w-[200px] truncate">
                    {todo.description}
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setCurrentTodoId(todo.todoId);
                  setCurrentTodo(todo);
                  setEditTitleContent(todo.title);
                  setEditDescriptionContent(todo.description);
                  setEditMode(true);
                }}
                className="p-3 bg-yellow-600 text-white flex items-center cursor-pointer hover:bg-yellow-400 hover:text-yellow-800 transition-all ease-in-out duration-300 font-bold"
              >
                EDIT
              </div>
              {editMode && currentTodoId === todo.todoId ? (
                <div
                  onClick={() => {
                    setEditMode(false);
                    setCurrentTodoId(0);
                  }}
                  className="p-3 bg-red-600 rounded-tr-sm text-white flex items-center cursor-pointer hover:bg-red-400 hover:text-red-800 transition-all ease-in-out duration-300 font-bold"
                >
                  CANCEL
                </div>
              ) : (
                <div
                  onClick={() => handleDelete(todo.todoId)}
                  className="p-3 bg-red-600 rounded-tr-sm text-white flex items-center cursor-pointer hover:bg-red-400 hover:text-red-800 transition-all ease-in-out duration-300 font-bold"
                >
                  DELETE
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
