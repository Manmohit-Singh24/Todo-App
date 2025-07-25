import "./Label.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLabel } from "../../../../store/Functions/SideBarSlice";

const Label = ({ label = "Label", icon = "", number = " " }) => {
    const dispatch = useDispatch();

    const handleClick = () => dispatch(setSelectedLabel(label));

    let isSelected = useSelector(
        (state) => state.SideBarStates.selectedLabel === label,
    );

    let className = `LabelContainer ${isSelected ? "LabelSelected" : " "}`;

    return (
        <button onClick={handleClick} className={className}>
            {icon}
            <span className={`LabelTitle`}>{label}</span>
            {number && <span className="LabelNumber">{number}</span>}
        </button>
    );
};

export default Label;
