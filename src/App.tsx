import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './components/TodoList';
import { v1 } from 'uuid';

export type FillterValuesType = 'all' | 'completed' | 'active'

function App() {


  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ]);
  console.log(tasks);

  let [filter, setFilter] = useState<FillterValuesType>('all')


  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks);
  }


  function changeStatus(taskId: string, isDone: boolean) {
   let task =  tasks.find(t =>  t.id === taskId)
   if(task){
    task.isDone = !task.isDone
   }
   setTasks( [ ...tasks ])

  }
 

  function removeTask(id: string) {
   let filteredTasks = tasks.filter( t =>  t.id !== id)
   setTasks(filteredTasks)
  }

  function changeFilter (value: FillterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === 'completed'){
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }
  if (filter === 'active'){
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }


  return (
    <div className="App">
      <TodoList title='What o learn' 
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={filter}
             
                  />

    </div>
  );
}


export default App;
