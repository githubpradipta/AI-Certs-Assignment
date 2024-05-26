import React, { useRef, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { useParams, useNavigate } from 'react-router-dom';


export default function Todoform({addTodo}) {
    const[todo,setTodo]=useState({title:"",description:"",due_date:"",status:0});
    const input=useRef();
    const {type} = useParams();
    const navigate = useNavigate();
  
  return (
    <div className='todoform todowarpper'>
    <h1>{type === 'create' ? 'Create a new task':'Update your task'}</h1>
    <input 
    type="text"
    ref={input}
    name='title'
    value={todo.title} 
    placeholder='Title'

    onChange={(e)=>{
      const { name, value } = e.target;
      setTodo({...todo,[name]:value})}}
    />

    <input 
    type="text"
    ref={input}
    name='description'
    value={todo.description} 
    placeholder='Description'

    onChange={(e)=>{
      const { name, value } = e.target;
      setTodo({...todo,[name]:value})}}
    />

    <input 
    type="text"
    ref={input}
    name='due_date'
    value={todo.due_date} 
    placeholder='Due Date'

    onChange={(e)=>{
      const { name, value } = e.target;
      setTodo({...todo,[name]:value})}}
    />
    
    <button className='btn' onClick={()=>{
      if(type==='create'){
        axios.post(`http://localhost:8000/tasks/`,todo)
        .then((res)=>{
          if(res.data.message!=="Created"){
            swal({
              title: `${res.data.message}`,
              icon: "warning",
              button: "I Understand"
            });
          }
          else{
           navigate('/'); 
          } 
        })
      }
      else{
        axios.put(`http://localhost:8000/tasks/${type}`,todo)
        .then((res)=>{
          if(res.data.message!=="Updated"){
            swal({
              title: `${res.data.message}`,
              icon: "warning",
              button: "I Understand"
            });
          }
          else{
           navigate('/'); 
          } 
        })
      }
      
      
        setTodo({title:"",description:"",due_data:"",status:0});
        input.current.focus();
    }}>{type==='create'? 'Add' : 'Update'}</button>
    <button className="btn" onClick={()=>{navigate('/')}}>Back</button>
    </div>
  )
}
