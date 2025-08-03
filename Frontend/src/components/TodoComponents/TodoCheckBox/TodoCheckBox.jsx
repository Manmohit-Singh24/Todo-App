import "./TodoCheckBox.css";
import Icon from "../../../utils/Icons";
import { useState } from "react";
const TodoCheckBox = ({ priority = 0, setChecked }) => {
    const [checked, toogleChecked] = useState(false);

    const onClick = () => {
        setChecked(!checked);
        toogleChecked(!checked);
    };

    const buttonClassName = `TodoCheckBoxContainer ${
        checked ? "Checked" : ""
    } P${priority}`;

    return (
        <button className={buttonClassName} onClick={onClick}>
            <Icon name={"IconTick"} size="XS" />
        </button>
    );
};

export default TodoCheckBox;
