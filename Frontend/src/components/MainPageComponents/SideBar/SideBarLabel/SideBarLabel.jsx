import "./SideBarLabel.css";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSideBarLabelId } from "../../../../store/Features/SideBarSlice";

const SideBarLabel = ({
    title = "SideBarLabel",
    icon = "",
    number = " ",
    id,
}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSelectedSideBarLabelId(id));
    };

    let isSelected = useSelector(
        (state) => state.SideBarStates.selectedSideBarLabelId === id,
    );

    let className = `SideBarLabelContainer ${
        isSelected ? "SideBarLabelSelected" : " "
    }`;

    return (
        <button onClick={handleClick} className={className} id={id}>
            {icon}
            <span className={`SideBarLabelTitle`}>{title}</span>
            {number && <span className="SideBarLabelNumber">{number}</span>}
        </button>
    );
};

export default SideBarLabel;
