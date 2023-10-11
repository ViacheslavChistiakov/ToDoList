import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
  }
  
  function EditableSpan (props:EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activetedEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activetedViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
   

    const onChangeHundlerTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode 
    ? <TextField  value={title} onChange={onChangeHundlerTitle} onBlur={activetedViewMode} autoFocus/>
    : <span onDoubleClick={activetedEditMode}>{props.title}</span>
  }


export default EditableSpan;