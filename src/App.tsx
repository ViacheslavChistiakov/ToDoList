import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './components/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export type FillterValuesType = 'all' | 'completed' | 'active'
type toDoListType = {
  id: string,
  title:string,
  filter: FillterValuesType

}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {



  function addTask(title: string, toDoListId:string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[toDoListId]
    let newTasks = [newTask, ...tasks]
    tasksObj[toDoListId] = newTasks
    setTasks({...tasksObj });
  }


  function changeStatus(taskId: string, isDone: boolean, toDoListId: string) {
   let tasks = tasksObj[toDoListId]
   let task =  tasks.find(t =>  t.id === taskId)
   if(task){
    task.isDone = !task.isDone
    setTasks(  {...tasksObj} )
   }
  

  }
 

  function removeTask(id: string, toDoListId: string) {
   let tasks = tasksObj[toDoListId]
   let filteredTasks = tasks.filter( t =>  t.id !== id)
   tasksObj[toDoListId] = filteredTasks
   setTasks({...tasksObj})
  }

  function changeFilter (value: FillterValuesType, toDoListId: string) {
      let toDoList = toDoLists.find(tl => tl.id === toDoListId)
      if(toDoList){
        toDoList.filter = value;
        setToDoList([...toDoLists])
      }
  }

 let toDoList1 = v1();
 let toDoList2 = v1();

 let [toDoLists, setToDoList] = useState<Array<toDoListType>>([
   { id: toDoList1, title: "What to learn", filter: "all"},
   { id: toDoList2, title: "What to buy", filter: "all"}
 ])


let removeToDoList = (toDoListId: string) => {
  let filteredToDoList = toDoLists.filter(tl => tl.id !== toDoListId)
  setToDoList(filteredToDoList);
  delete tasksObj[toDoListId]
  setTasks({...tasksObj})
}

function changeToDoListTitle(id: string, newTitle: string) {
  const toDoList = toDoLists.find(tl => tl.id === id)
  if (toDoList) {
    toDoList.title = newTitle;
    setToDoList([...toDoLists])
  }
}


 let [tasksObj, setTasks] = useState<TasksStateType>({
    [toDoList1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [toDoList2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: false },
    ]
 });

 function addToDoList(title: string) {
  let toDoList: toDoListType = {
    id: v1(),
    title: title,
    filter: 'all'
  }
  setToDoList([toDoList, ...toDoLists]);
  setTasks({...tasksObj, [toDoList.id]:[]})
 }

  return (
    <div className="App">
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Container fixed>
      <Grid container style={ {padding: "20px"} }>
      <AddItemForm addItem={addToDoList}/>
      </Grid>
      <Grid container spacing={3}> 
      {
        toDoLists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === 'completed'){
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
          }
          if (tl.filter === 'active'){
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
          }

          function changeTaskTitle(taskId: string, newTitle: string, toDoListId: string) {
            let tasks = tasksObj[toDoListId]
            let task =  tasks.find(t =>  t.id === taskId)
            if(task){
             task.title = newTitle
             setTasks(  {...tasksObj} )
            }
           
         
           }


          return <Grid item>
            <Paper style={ { padding: "10px" } }>
            <TodoList
          key={tl.id}
          id={tl.id} 
          title={tl.title}
          tasks={tasksForTodoList}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          changeTaskTitle={changeTaskTitle}
          filter={tl.filter}
          removeToDoList={removeToDoList}
          changeToDoListTitle={changeToDoListTitle}
     
          />
          </Paper>
          </Grid>
        
        })
      }
      </Grid>
    

    </Container>



                  

    </div>
  );
}


export default App;
