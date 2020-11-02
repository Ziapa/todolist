import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    title: string
    changeTitle: (title:string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
      if (title.trim()) {
          props.changeTitle(title.trim())
      }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode ?
                // <input
                //     autoFocus
                //     onBlur={offEditMode}
                //     value={title}
                //     onChange={changeTitle}
                //     type="text"
                // />
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

}