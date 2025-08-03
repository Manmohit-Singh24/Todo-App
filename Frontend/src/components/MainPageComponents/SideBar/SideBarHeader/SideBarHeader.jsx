import "./SideBarHeader.css";
import Icon from "../../../../utils/Icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarExpantionState } from "../../../../store/Features/SideBarSlice";

const SideBarHeader = () => {

    let name = useSelector((state) => state.AuthData.Name) || "Name";
    name = name.split(" ")[0]; // only taking first name
    
    const dispatch = useDispatch();

    const [isSideBarHeaderExpanded, setIsSideBarHeaderExpanded] = useState(false);

    const isSideBarExpanded = useSelector(
        (state) => state.SideBarStates.sideBarExpanded,
    );
 
    const changeSideBarState = () => {
        dispatch(setSideBarExpantionState(!isSideBarExpanded));
    };

    let className = `SideBarHeaderContainer ${
        isSideBarHeaderExpanded ? "SideBarHeaderExpanded" : ""
    }`;

    return (
        <div className={className}>
            <button
                className="SideBarHeaderLeft"
                onClick={() => setIsSideBarHeaderExpanded(!isSideBarHeaderExpanded)}
            >
                <div className="SideBarHeaderProfileIcon">
                    <Icon name={"IconProfileLight"} size="XL" />{" "}
                </div>
                <p className="SideBarHeaderText">{name}</p>
                <div className="SideBarHeaderVIcon">
                    <Icon name={"IconV"} size="XS" />
                </div>
            </button>
            <div className="SideBarHeaderRight">
                <button className="SideBarHeaderBellIcon">
                    <Icon name={"IconBell"} size="M" />
                </button>
                <button
                    className="SideBarHeaderSideBarIcon"
                    onClick={changeSideBarState}
                >
                    <Icon name={"IconSideBar"} size="M" />
                </button>
            </div>
        </div>
    );
};
export default SideBarHeader;
