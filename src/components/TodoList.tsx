import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react";
import { FillterValuesType } from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";


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
    changeTaskTitle: (taskId: string, newTitle: string, toDoListId: string) => void
    removeToDoList: (toDoListId: string) => void
    changeToDoListTitle: (id: string, newTitle: string) => void
    
 
}

export function TodoList(props: PropsType) {
  const onAllClickHundler = () => props.changeFilter('all', props.id);
  const onActiveClickHundler = () => props.changeFilter('active', props.id);
  const onCompletedClickHundler = () => props.changeFilter('completed', props.id);
  const removeToDoList = () =>  props.removeToDoList(props.id);
  const changeToDoListTitle = (newTitle: string) =>  {
    props.changeToDoListTitle(props.id, newTitle)
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

    return (
      <div className="firstSector">
        <h3><EditableSpan title={props.title} onChange={changeToDoListTitle}/>
        <IconButton  onClick={removeToDoList}>
            <Delete />
    </IconButton>
        </h3>
           <AddItemForm  addItem={addTask} />
        <ul>
          {
            props.tasks.map(t => { 
              const onRemoveHundler =  () => { props.removeTask(t.id, props.id )} 
              const onChangeStatusHundler = (e:ChangeEvent<HTMLInputElement> ) => { 
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id ) 
              }
              const onChangeTitleHundler = (newValue: string) => { 
                props.changeTaskTitle(t.id, newValue, props.id ) 
              }
              return <li className={t.isDone ? "is-done" : ""} key={t.id}>
                <input type="checkbox"
                    onChange={onChangeStatusHundler} 
                    checked={t.isDone} />
              <EditableSpan  title={t.title} onChange={onChangeTitleHundler}/>
              <IconButton  onClick={onRemoveHundler}>
                  <Delete />
          </IconButton>
              </li>
          })
          }
        </ul>
        <div className="filter">
          <Button variant={props.filter === 'all' ? "contained" : "text"}  onClick={onAllClickHundler}>All</Button>
          <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"} onClick={onActiveClickHundler}>Active</Button>
          <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"} onClick={onCompletedClickHundler}>Completed</Button>
        </div>
      </div>
  
    )
  }



  export default TodoList;

   