import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './components/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/AddItemForm';
import { title } from 'process';

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
      <AddItemForm addItem={addToDoList}/>
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


          return <TodoList
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
        })
      }


                  

    </div>
  );
}


export default App;
