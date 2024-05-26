import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Todos({ todo, index, delfunc, toggleTodo}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="todos">
        <div className={`${todo.completed ? 'todo-info' : 'todo-re'}`}>
          <span className={`material-symbols-outlined ${todo.completed ? '' : 'not-checked'}`}>task_alt</span>

          <p onClick={() => { toggleTodo(index) }} className={`${todo.completed ? 'completed' : ''}`}><span>{index + 1}.&nbsp;</span>
          <div className="innerdiv">
            <p>Title : {todo.title}</p>
            <p>Description : {todo.description}</p>
            <p>Due Date : {todo.due_date}</p>
            <p>Status : {(todo.status) ? 'Completed' : 'Pending' }</p>
          </div>
          </p>
        </div>

        <div className="icons">
          <span className="material-symbols-outlined update-icon"
          onClick={()=>{
            navigate(`/form/${todo.id}`)
          }}>edit_note</span>
        
          <span className="material-symbols-outlined dlt-icon"
            onClick={() => {
              delfunc(todo.id)
            }}>delete</span>
        </div>

      </div>
    </>
  )
}
