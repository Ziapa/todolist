import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    value: string
    onChange: (title:string) => void
}

export const  EditableSpan = React.memo ((props: EditableSpanPropsType) => {

    console.log("render EditableSpan")

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
      if (title.trim()) {
          props.onChange(title.trim())
      }
    }
    const changeTitle =  (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode ?

                <TextField
                    autoFocus
                    size={"small"}
                    value={title}
                    onBlur={offEditMode}
                    variant={"filled"}
                    onChange={changeTitle}
                />
                :
                <span onDoubleClick={onEditMode}> {title}</span>

})