import "./TodoCheckBox.css";
import Icon from "../../../utils/Icons";
import { useState } from "react";
const TodoCheckBox = ({ priority = 0, checked , setChecked }) => {

    const buttonClassName = `TodoCheckBoxContainer ${
        checked ? "Checked" : ""
    } P${priority}`;

    return (
        <button className={buttonClassName} onClick={()=>setChecked(!checked)}>
            <Icon name={"IconTick"} size="XS" />
        </button>
    );
};

export default TodoCheckBox;
