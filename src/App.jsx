import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  async function getTodos(){
    const res = await axios.get("http://localhost:3333/api/todos");
    console.log(res);
    setTodos(res.data);
  }

  useEffect(()=>{
    getTodos();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const newTodo = {title, description};
    const res = await axios.post("http://localhost:3333/api/todos/", newTodo);
  }

  return (
    <div className='flex flex-col mx-auto p-10'>
      <main className='flex-1 mx-auto'>
        <h1 className='text-6xl font-bold text-green-500'>Best Todo App</h1>
        <h2 className='text-left pt-10 pb-3 font-bold text-green-500'>
          Create New Todo
        </h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input
            id="title"
            name="title" 
            type="text" 
            className='border px-2 py-1 rounded' 
            placeholder='Title'
          />
          <input 
            id="description"
            name="description"
            type="text" 
            className='border px-2 py-1 mt-2 rounded' 
            placeholder='Description'
          />
          <button className='border bg-green-500 text-white rounded my-3 p-2 cursor-pointer hover:bg-green-400 hover:text-green-800 transition-all ease-in-out duration-300 font-bold'>
            CREATE
          </button>
        </form>
        <h2 className='text-left pt-5 pb-3 font-bold text-green-500'>
          All Todos
        </h2>
        {todos.map((todo)=> (
          <div className='flex my-5' key={todo.todoId}>
            <div className='flex-1'>
              <div className='p-3 bg-green-500 text-white text-xl font-bold rounded-tl-sm'>
                {todo.title}
              </div>
              <div className='p-3 bg-gray-300'>{todo.description}</div>
            </div>
            <div className='p-3 bg-yellow-600 text-white flex items-center cursor-pointer hover:bg-yellow-400 hover:text-yellow-800 transition-all ease-in-out duration-300 font-bold'>
              EDIT
            </div>
            <div className='p-3 bg-red-600 rounded-tr-sm text-white flex items-center cursor-pointer hover:bg-red-400 hover:text-red-800 transition-all ease-in-out duration-300 font-bold'>
              DELETE
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
