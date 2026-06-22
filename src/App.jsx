import { useState } from 'react'
import { useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  const inputRef = useRef(null);
  const [dueDate, setDueDate] = useState("");
  const [title, settitle] = useState("")
  const [task, settask] = useState([])
  const [editId, setEditId] = useState(null);
  const [category, setcategory] = useState("")
  const [taskstate, settaskstate] = useState("all")
  const pendingTasks = task.filter((t) => !t.completed);
  const completedTasks = task.filter((t) => t.completed);
  const addtask = () => {

    if (!title.trim()) return;
    const newtask = {
      id: Date.now(),
      title: title,
      completed: false,
      category: category === "" ? "no category" : category,
      dueDate: dueDate
    };
    
    
    console.log(newtask)
    settask([...task, newtask]);
    setcategory("")
    settitle("")
    setDueDate("")
    
  };
  const completedtask = (id) => {
    settask(
      task.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t

      )
    )
  }
  const deletetask = (id) => {
    settask(
      task.filter((t) => t.id !== id
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
    if (!title.trim()) {

      cancelEdit();

      return;

    }
    settask(

      task.map((t) =>
        t.id === editId
          ? { ...t, title: title }
          : t
      )
    );

    console.log(title)
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
        onChange={(e) => settitle(e.target.value)}
        placeholder='enter task'
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editId ? saveTask() : addtask();
          }
          if (e.key === 'Escape') cancelEdit();
        }
        }
      />
      <select name="" id=""
        value={category}
        onChange={(e) => setcategory(e.target.value)}
      >
        <option value="">no category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={editId ? saveTask : addtask}>{editId ? "save task" : "add task"}</button>
      {editId && (
        <button onClick={cancelEdit}>
          Cancel
        </button>
      )}
      <span className='taskstateclass'>
        <span onClick={()=>settaskstate("all")} className={taskstate === "all" ? "active" : ""}>all</span>
        <span onClick={()=>settaskstate("pending") } className={taskstate === "pending" ? "active" : ""}>pending</span>
        <span onClick={()=>settaskstate("completed")} className={taskstate === "completed" ? "active" : ""}>completed</span>
      </span>
      <h3>Pending task</h3>
      {pendingTasks.map((t) => (
        <div key={t.id} className={editId === t.id ? "editing" : ""}>
          <span onClick={() => completedtask(t.id)} className={t.completed ? "done" : ""}>
            {t.title}({t.category})- {t.dueDate}


          </span>
          <button onClick={() => deletetask(t.id)}>Delete</button>
          <button onClick={() => edittask(t.id)}>Edit</button>


        </div>
      ))}
      <h3>completed task</h3>
      {completedTasks.map((t) => (
        <div key={t.id} onClick={() => completedtask(t.id)}>
          <span className={t.completed ? "done" : ""}>
            {t.title}
          </span>
      
          ({t.category}) - {t.dueDate}
        </div>
      ))}
      
    </>
  )
}

export default App
