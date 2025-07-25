import "./SideBar.css";
import Icon from "../../../utils/Icons";
import { Label, UserName } from "./";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLabel } from "../../../store/Functions/SideBarSlice";

const SideBar = ({
    SideBarLabels = [],

    SideBarUserLists = [
        // {
        //     label: "Label",
        //     icon: "IconList2",
        // },
    ],
    SideBarUserListsHeading = "Heading",
}) => {
    const dispatch = useDispatch();

    const handleClick = () =>
        dispatch(setSelectedLabel(SideBarUserListsHeading));

    let isSelected = useSelector(
        (state) =>
            state.SideBarStates.selectedLabel === SideBarUserListsHeading,
    );

    const isSideBarExpanded = useSelector(
        (state) => state.SideBarStates.sideBarExpanded,
    );

    let userListsClassName = `SideBarUserLists ${isSelected ? "Selected" : ""}`;

    let sideBarClassName = `SideBarContainer ${
        isSideBarExpanded ? "SideBarExpanded" : "SideBarCollapsed"
    }`;

    const [isUserListsExpanded, setIsUserListsExpanded] = useState(true);

    const toogleUserListsDsiplay = () =>
        setIsUserListsExpanded(!isUserListsExpanded);

    SideBarUserLists = SideBarUserLists.map((item) => {
        return (
            <Label
                label={item.label}
                icon={<Icon name={item.icon} size={"M"} />}
            />
        );
    });

    SideBarLabels = SideBarLabels.map((item) => {
        return (
            <Label
                label={item.label}
                icon={<Icon name={item.icon} size={"M"} />}
            />
        );
    });

    return (
        <div className={sideBarClassName}>
            <nav className="SideBarNav">
                <UserName />
                <div className="SideBarLables">
                    {...SideBarLabels}
                </div>

                <div className={userListsClassName}>
                    <button onClick={handleClick}>
                        {SideBarUserListsHeading}{" "}
                    </button>
                    <div className="SideBarUserListsIcons">
                        <button>
                            <Icon name={"IconPlus"} size={"XS"} />
                        </button>
                        <button
                            className={
                                !isUserListsExpanded
                                    ? "SideBarUserListsCollapsed"
                                    : ""
                            }
                            onClick={toogleUserListsDsiplay}
                        >
                            <Icon name={"IconV"} size={"XS"} />
                        </button>
                    </div>
                </div>

                <div
                    className={`SideBarUserListsLables ${
                        !isUserListsExpanded ? "SideBarUserListsCollapsed" : ""
                    }`}
                >
                    {...SideBarUserLists}
                </div>
            </nav>
        </div>
    );
};
export default SideBar;
