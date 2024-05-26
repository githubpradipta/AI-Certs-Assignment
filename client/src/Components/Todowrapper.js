import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Todos from './Todos'

export default function Todowrapper() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/tasks/${id}`)
    .then(()=>{
      axios.get('http://localhost:8000/tasks/')
      .then((res)=>{setTodos(res.data)})
      navigate('/');
    })
  }

  useEffect(()=>{
    axios.get('http://localhost:8000/tasks/')
    .then((res)=>{setTodos(res.data)})
  },[])


  const toggleTodo = (key) => {
    setTodos(todos.map((todo, index) => index === key ? { ...todo, completed: !todo.completed, status: !todo.status} : todo))
  }

  if (todos.length !== 0) {
    return (
      <div className='todowarpper'>
        <h1>List of your Works!</h1>
        <button className="btn" onClick={()=>{navigate('/form/create')}}>Create Task</button>
        {
          todos.map((todo, index) => {
            
           
              return <Todos todo={todo} index={index} key={index} delfunc={deleteTodo} toggleTodo={toggleTodo} />

          })
        }

      </div>
    )
  }
  else{
    return (
      <div className='todowarpper'>
        <h1>List of your Works!</h1>
        <button className="btn" onClick={()=>{navigate('/form/create')}}>Create Task</button>
        <p>You have no works to do</p>
  
      </div>
    )
  }


}
