import React, {ChangeEvent, useState} from "react";


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

    return (
        <div>
            {editMode ?
                <input
                    autoFocus
                    onBlur={offEditMode}
                    value={title}
                    onChange={changeTitle}
                    type="text"
                />
                :
                <span onDoubleClick={onEditMode}> {title}</span>}

        </div>
    )
}