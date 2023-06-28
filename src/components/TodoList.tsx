import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react";
import { FillterValuesType } from "../App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FillterValuesType
    removeTask: (id: string) => void
    changeFilter: (value: FillterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
 
}

export function TodoList(props: PropsType) {
  let [title, setTitle ] = useState("");
  let [error, setError ] = useState<string | null>(null);

  const onNewTitleChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHundler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13 && title.trim() !== "" ) {
      props.addTask(title.trim());
        setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const addTask = () => {
    if(title.trim() !== "") {
      props.addTask(title.trim());
      setTitle("")
    } else {
      setError("Title is required")
    }

  }

  const onAllClickHundler = () => props.changeFilter('all');
  const onActiveClickHundler = () => props.changeFilter('active');
  const onCompletedClickHundler = () => props.changeFilter('completed');


    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input value={title} 
           onChange={onNewTitleChangeHundler}
            onKeyPress={onKeyPressHundler}
            className={error ? 'error' : ""}
            />
          <button onClick={addTask}>+</button>
          {error && <div className="error-message">{error}</div>}

        </div>
        <ul>
          {
            props.tasks.map(t => { 
              const onRemoveHundler =  () => { props.removeTask(t.id) } 
              const onChangeHundler = (e:ChangeEvent<HTMLInputElement> ) => { props.changeTaskStatus(t.id, e.currentTarget.checked) }
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

   