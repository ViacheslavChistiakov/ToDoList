import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './components/TodoList';
import { v1 } from 'uuid';

export type FillterValuesType = 'all' | 'completed' | 'active'
type toDoListType = {
  id: string,
  title:string,
  filter: FillterValuesType

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
   { id: toDoList1, title: "What to learn", filter: "active"},
   { id: toDoList2, title: "What to buy", filter: "completed"}
 ])


let removeToDoList = (toDoListId: string) => {
  let filteredToDoList = toDoLists.filter(tl => tl.id !== toDoListId)
  setToDoList(filteredToDoList);
  delete tasksObj[toDoListId]
  setTasks({...tasksObj})
}


 let [tasksObj, setTasks] = useState({
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


  return (
    <div className="App">
      {
        toDoLists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === 'completed'){
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
          }
          if (tl.filter === 'active'){
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
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
          filter={tl.filter}
          removeToDoList={removeToDoList}
     
          />
        })
      }


                  

    </div>
  );
}


export default App;
