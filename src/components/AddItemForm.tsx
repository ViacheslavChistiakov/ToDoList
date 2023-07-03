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
            <input value={title} 
           onChange={onNewTitleChangeHundler}
            onKeyPress={onKeyPressHundler}
            className={error ? 'error' : ""}
            />
          <button onClick={addTask}>+</button>
          {error && <div className="error-message">{error}</div>}
    </div>
 } 

 export default AddItemForm;