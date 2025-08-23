import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <div className='flex flex-col mx-auto p-10'>
      <main className='flex-1 mx-auto'>
        <h1 className='text-6xl font-bold text-green-500'>Best Todo App</h1>
        <h2 className='text-left pt-10 pb-3 font-bold text-green-500'>
          Create New Todo
        </h2>
        <form action="" className='flex flex-col'>
          <input 
            type="text" 
            className='border px-2 py-1 rounded' 
            placeholder='Title'
          />
          <input 
            type="text" 
            className='border px-2 py-1 mt-2 rounded' 
            placeholder='Description'
          />
          <button className='border bg-green-500 text-white rounded my-3 p-2'>
            CREATE
          </button>
        </form>
        <h2 className='text-left pt-5 pb-3 font-bold text-green-500'>
          All Todos
        </h2>
      </main>
    </div>
  );
}

export default App;
