import { useState, useEffect } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import Todo from "./components/Todo";

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();

    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  const addTodo = async () => {
    if (newTodo !== "") {
      const data = await fetch(API_BASE + "/todo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      }).then((res) => res.json());

      setTodos([...todos, data]);
      setPopupActive(false);
      setNewTodo("");
    } else {
      setPopupActive(false);
      setNewTodo("");
    }
  };

  return (
    <div className="App w-full h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, Michael</h1>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            id={todo._id}
            text={todo.text}
            complete={todo.complete}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
      <button
        className="absolute bottom-8 right-8 w-12 h-12 cursor-pointer text-gray-500 rounded-full border-2 border-gray-300 text-2xl flex items-center justify-center hover:border-gray-800 hover:bg-gray-800 hover:text-white"
        onClick={() => setPopupActive(true)}
      >
        <BiPlus />
      </button>
      {popupActive ? (
        <div className="absolute w-screen h-screen inset-0 z-10 bg-black/50 flex items-center justify-center">
          <div className="relative w-64 rounded-md bg-white p-6 justify-center">
            <h3 className="text-2xl font-medium">Add task</h3>
            <input
              type="text"
              className="bg-gray-100 mt-4 w-full rounded-md overflow-hidden h-8 px-2 outline-none focus:ring-gray-800 focus:ring-2"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <button
              className="mt-4 ml-auto flex px-2 py-1 items-center bg-gray-100 hover:bg-gray-800 hover:text-white rounded-md"
              onClick={addTodo}
            >
              <BiPlus />
              Add to-do
            </button>
            <button
              className="absolute top-6 right-6 w-8 h-8 hover:bg-gray-200 font-medium rounded-md flex items-center justify-center ml-auto text-2xl"
              onClick={() => setPopupActive(false)}
            >
              <BiX />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
