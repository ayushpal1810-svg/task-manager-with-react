import { useState } from 'react'
import { useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  const inputRef = useRef(null);
  const [title, settitle] = useState("")
  const [task, settask] = useState([])
  const [editId, setEditId] = useState(null);
  const pendingTasks = task.filter((t) => !t.completed);
const completedTasks = task.filter((t) => t.completed);
  const addtask = ()=>{
    if (!title.trim()) return;
    const newtask={
      id: Date.now(),
      title: title,
      completed: false
    };
    console.log(title)
    settask([...task,newtask]);
    settitle("")
  };
  const completedtask=(id)=>{
    settask(
      task.map((t)=>
      t.id===id ? { ...t, completed: !t.completed }: t

      )
    )
  }
  const deletetask=(id)=>{
    settask(
      task.filter((t)=> t.id!==id
      )
    )
  }
 const edittask = (id) => {
  const taskToEdit = task.find((t) => t.id === id);

  settitle(taskToEdit.title);  
  setEditId(id);   
  inputRef.current.focus();
};
const saveTask = () => {
  settask(
    task.map((t) =>
      t.id === editId
        ? { ...t, title: title }
        : t
    )
  );

  settitle("");
  setEditId(null);
};
const cancelEdit = () => {
  setEditId(null);
  settitle("");
};
   
  return (
    <>
    <input type="text" value={title}
    ref={inputRef}
    onChange={(e)=> settitle(e.target.value)}
    placeholder='enter task'
    onKeyDown={(e) => {
  if (e.key === "Enter") {
    editId ? saveTask() : addtask();
  }
  if(e.key==='Escape') cancelEdit();
}

    }
    />
    <button onClick={editId ? saveTask: addtask }>{editId ? "save task" : "add task"}</button>
         {editId && (
  <button onClick={cancelEdit}>
    Cancel
  </button>
)}
    <h3>Pending task</h3>
   { pendingTasks.map ((t)=>(
    <div>
    <span key={t.id} onClick={()=>completedtask(t.id) } className={t.completed ? "done" : ""}>{t.title} 
    
     </span>
     <button onClick={()=>deletetask(t.id)}>Delete</button>
     <button onClick={()=>edittask(t.id)}>Edit</button>

     
     </div>
   ))}
   <h3>completed task</h3>
   { completedTasks.map ((t)=>(
    <div key={t.id} onClick={()=>completedtask(t.id) } className={t.completed ? "done" : ""}>{t.title}</div>
   ))}
    </>
  )
}

export default App
