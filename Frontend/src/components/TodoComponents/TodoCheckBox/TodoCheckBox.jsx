import "./TodoCheckBox.css";
import Icon from "../../../utils/Icons";
import { useState } from "react";
const TodoCheckBox = ({ priority = 4, checked, setChecked, disabled = false, ...props }) => {
    const buttonClassName = `TodoCheckBoxContainer ${checked ? "Checked" : ""} P${priority} ${
        disabled ? "Disabled" : ""
    } `;

    return (
        <button
            className={buttonClassName}
            onClick={(e) => {
                e.stopPropagation();
                setChecked(!checked);
            }}
            disabled={disabled}
            {...props}
        >
            <Icon name={"IconTick"} size="XS" />
        </button>
    );
};

export default TodoCheckBox;
