const express = require('express'); 
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); 
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());

// In memory storage
const Tasks = []

app.listen(PORT,()=>{
    console.log(`Server start at port ${PORT}`);
})


//Api end points

app.get('/tasks',(req,res)=>{
    res.status(200).json(Tasks);
})
app.get('/tasks/:id',(req,res)=>{
    const ID = req.params.id;
    const task = Tasks.find((task)=>task.id == ID);
    res.status(200).json(task);
})
app.post('/tasks',(req,res)=>{
    const task = req.body;
    if(task.title && task.description && task.due_date){
        task.id = uuidv4();
        Tasks.push(task);
        return res.status(200).json({
            message:"Created"
        })
    }
    else{
        return res.json({
            message: "Please fill all the input fields"
        })
    }



})
app.delete('/tasks/:id',(req,res)=>{
    const ID = req.params.id;
    const taskIndex = Tasks.findIndex((task)=>task.id == ID);
    if(taskIndex!==-1)
        Tasks.splice(taskIndex,1);

    res.status(200).json({
        message:"Task is Deleted"
    });
})
app.put('/tasks/:id',(req,res)=>{
    const updateTask = req.body;
    const ID = req.params.id;
    if(updateTask.title && updateTask.description && updateTask.due_date){
        const taskIndex = Tasks.findIndex((task)=>task.id == ID);
        if(taskIndex!==-1)
            Tasks[taskIndex] = {...Tasks[taskIndex],...updateTask};
    
        return res.status(200).json({
            message:"Updated"
        });

    }
    else return res.json({
        message: "Please fill all the input fields"
    })
})