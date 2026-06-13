import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [title, settitle] = useState("")
  const [task, settask] = useState([])
  const addtask = ()=>{
    if (!title.trim()) return;
    const newtask={
      id: Date.now(),
      title: title,
      completed: false
    };
    settask([...task,newtask]);
    settitle("")
  };
   console.log(title)
    console.log(task)
  return (
    <>
    <input type="text" value={title}
    onChange={(e)=> settitle(e.target.value)}
    placeholder='enter task'
    />
    <button onClick={addtask}>add task</button>
   { task.map ((t)=>(
    <div key={t.id}>{t.title}</div>
   ))}
    </>
  )
}

export default App
