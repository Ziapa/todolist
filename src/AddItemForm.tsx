import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const  AddItemForm = React.memo ((props: AddItemFormPropsType) => {

    const addItem = () => {
        if (newTitle.trim()) {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Title is required")
        }
    }

    const [newTitle, setNewTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }


        if (e.key === "Enter") {
            addItem()
        }
    }
    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})