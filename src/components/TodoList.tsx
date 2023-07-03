import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react";
import { FillterValuesType } from "../App";
import AddItemForm from "./AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FillterValuesType
    removeTask: (id: string,   toDoListId: string) => void
    changeFilter: (value: FillterValuesType, toDoListId:string) => void
    addTask: (title: string,   toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void
 
}

export function TodoList(props: PropsType) {
  const onAllClickHundler = () => props.changeFilter('all', props.id);
  const onActiveClickHundler = () => props.changeFilter('active', props.id);
  const onCompletedClickHundler = () => props.changeFilter('completed', props.id);
  const removeToDoList = () =>  props.removeToDoList(props.id);

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

    return (
      <div>
        <h3>{props.title} <button onClick={removeToDoList}>x</button>
        </h3>
           <AddItemForm  addItem={addTask} />
        <ul>
          {
            props.tasks.map(t => { 
              const onRemoveHundler =  () => { props.removeTask(t.id, props.id )} 
              const onChangeHundler = (e:ChangeEvent<HTMLInputElement> ) => { props.changeTaskStatus(t.id, e.currentTarget.checked, props.id ) }
              return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                <input type="checkbox"
                    onChange={onChangeHundler} 
                    checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHundler}>x</button>
              </li>
          })
          }
        </ul>
        <div>
          <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHundler}>All</button>
          <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHundler}>Active</button>
          <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHundler}>Completed</button>
        </div>
      </div>
  
    )
  } 


  export default TodoList;

   