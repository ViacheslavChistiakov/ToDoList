import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FillterValuesType } from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FillterValuesType) => void
    addTask: (title: string) => void
}

function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle ] = useState('');

  const onNewTitleChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const onKeyPressHundler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }
  }

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle('')
  }

  const onAllClickHundler = () => props.changeFilter('all');
  const onActiveClickHundler = () => props.changeFilter('active');
  const onCompletedClickHundler = () => props.changeFilter('completed');

    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input value={newTaskTitle} 
           onChange={onNewTitleChangeHundler}
            onKeyPress={onKeyPressHundler}
            />
          <button onClick={addTask}>+</button>
        </div>
        <ul>
          {
            props.tasks.map(t => { 
              const onRemoveHundler =  () => { 
                props.removeTask(t.id) 
              } 
              return <li key={t.id}><input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHundler}>x</button>
              </li>
          })
          }
        </ul>
        <div>
          <button onClick={onAllClickHundler}>All</button>
          <button onClick={onActiveClickHundler}>Active</button>
          <button onClick={onCompletedClickHundler}>Completed</button>
        </div>
      </div>
  
    )
  } 

  export default TodoList;

   