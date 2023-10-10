import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormProps = {
    addItem: (title: string) => void
 }
 function AddItemForm(props: AddItemFormProps) {
  let [title, setTitle ] = useState("");
  let [error, setError ] = useState<string | null>(null);
  const onNewTitleChangeHundler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyPressHundler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13 && title.trim() !== "" ) {
      props.addItem(title.trim() );
        setTitle("")
    } else {
      setError("Title is required")
    }
  }
  const addTask = () => {
    if(title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("")
    } else {
      setError("Title is required")
    }

  }
    return <div>
          <TextField value={title}
          variant={"outlined"}
          label={"Type value"} 
           onChange={onNewTitleChangeHundler}
            onKeyPress={onKeyPressHundler}
            error={!!error}
            helperText={error}
            />
          <Button onClick={addTask} variant={"contained"} color={"primary"}>+</Button>
    </div>
 } 

 export default AddItemForm;