import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  const inputRef = useRef(null);
  const [dueDate, setDueDate] = useState("");
  const [title, settitle] = useState("")
  const [task, settask] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(task));
}, [task]);
  const [editId, setEditId] = useState(null);
  const [category, setcategory] = useState("")
  const [taskstate, settaskstate] = useState("all")
  const [filtercategory, setfiltercategory] = useState("all")
  const [dateFilter, setdateFilter] = useState("all");
const [customDate, setCustomDate] = useState("");
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
      setcategory(taskToEdit.category);

  setDueDate(taskToEdit.dueDate);
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
          ? { ...t, title: title, category: category , dueDate:dueDate }: t
      )
    );

    console.log(title)
    setcategory("")
    settitle("")
    setDueDate("")
    setEditId(null);

  };
  const cancelEdit = () => {
    setEditId(null);
    settitle("");
  };
  let filteredTasks = task;

if (taskstate === "pending") {
  filteredTasks = task.filter((t) => !t.completed);
}

else if (taskstate === "completed") {
  filteredTasks = task.filter((t) => t.completed);
}
if (filtercategory !== "all") {
  filteredTasks = filteredTasks.filter(
    (t) => t.category === filtercategory
  );
}
  const today = new Date().toISOString().split("T")[0];
 
if (dateFilter === "today") {


  filteredTasks = filteredTasks.filter(
    (t) => t.dueDate === today
  );
}

if (dateFilter === "custom" && customDate) {
  filteredTasks = filteredTasks.filter(
    (t) => t.dueDate === customDate
  );
}

const visibleTasks = [...filteredTasks].sort(
  (a, b) => a.completed - b.completed
);
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
        <span onClick={()=>settaskstate("all")} className={`box ${taskstate === "all" ? "active" : ""}`}>all</span>
        <span onClick={()=>settaskstate("pending") } className={`box ${taskstate === "pending" ? "active" : ""}`}>pending</span>
        <span onClick={()=>settaskstate("completed")} className={`box ${taskstate === "completed" ? "active" : ""}`}>completed</span>
      </span>
        <span className='taskstateclass'>
        <span onClick={()=>setfiltercategory("all")} className={`box ${filtercategory === "all" ? "active" : ""}`}>all</span>
        <span onClick={()=>setfiltercategory("Work") } className={`box ${filtercategory === "Work" ? "active" : ""}`}>work</span>
        <span onClick={()=>setfiltercategory("Personal")} className={`box ${filtercategory === "Personal" ? "active" : ""}`}>personal</span>
        <span onClick={()=>setfiltercategory("no category")} className={`box ${filtercategory === "no category" ? "active" : ""}`}>no category</span>
      </span>
            <span className='taskstateclass'>
        <span onClick={()=>setdateFilter("all")} className={`box ${dateFilter === "all" ? "active" : ""}`}>all</span>
        <span onClick={()=>setdateFilter("today") } className={`box ${dateFilter === "today" ? "active" : ""}`}>today</span>
        <span onClick={()=>setdateFilter("custom")} className={`box ${dateFilter === "custom" ? "active" : ""}`}>custom</span>
      </span>
      {dateFilter === "custom" && (
  <input
    type="date"
    value={customDate}
    onChange={(e) => setCustomDate(e.target.value)}
  />
)}

      {visibleTasks.map((t)=>{
const isOverdue =
  !t.completed &&
  t.dueDate &&
  t.dueDate < today;
        return(
        <div key={t.id} className={editId === t.id ? "editing" : ""}>


     <span onClick={() => completedtask(t.id)} className={`
  ${t.completed ? "done" : ""}
  ${isOverdue ? "overdue" : ""}
`}>
            {t.title}({t.category})- {t.dueDate}


          </span>
          <button onClick={() => deletetask(t.id)}>Delete</button>
          <button onClick={() => edittask(t.id)}>Edit</button>


  </div>
        );
})}
      


      
    </>
  )
}

export default App
