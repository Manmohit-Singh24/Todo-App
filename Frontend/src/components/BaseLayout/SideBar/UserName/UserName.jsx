import "./UserName.css";
import Icon from "../../../../utils/Icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarExpantionState } from "../../../../store/Functions/SideBarSlice";

const UserName = ({ name = "Username" }) => {
    const dispatch = useDispatch();

    const [isUserNameExpanded, setIsUserNameExpanded] = useState(false);

    const isSideBarExpanded = useSelector(
        (state) => state.SideBarStates.sideBarExpanded,
    );

    const changeSideBarState = () => {
        dispatch(setSideBarExpantionState(!isSideBarExpanded));
    };

    let className = `UserNameContainer ${
        isUserNameExpanded ? "UserNameExpanded" : ""
    }`;

    return (
        <div className={className}>
            <button
                className="UserNameLeft"
                onClick={() => setIsUserNameExpanded(!isUserNameExpanded)}
            >
                <div className="UserNameProfileIcon">
                    <Icon name={"IconProfileLight"} size="XL" />{" "}
                </div>
                <p className="UserNameText">{name}</p>
                <div className="UserNameVIcon">
                    <Icon name={"IconV"} size="XS" />
                </div>
            </button>
            <div className="UserNameRight">
                <button className="UserNameBellIcon">
                    <Icon name={"IconBell"} size="M" />
                </button>
                <button
                    className="UserNameSideBarIcon"
                    onClick={changeSideBarState}
                >
                    <Icon name={"IconSideBar"} size="M" />
                </button>
            </div>
        </div>
    );
};
export default UserName;
