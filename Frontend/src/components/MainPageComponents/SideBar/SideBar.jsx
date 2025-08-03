import "./SideBar.css";
import Icon from "../../../utils/Icons";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import SideBarLabel from "./SideBarLabel/SideBarLabel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSideBarLabelId } from "../../../store/Features/SideBarSlice";

const SideBar = ({
    SideBarDefaultLabels = [],
    SideBarCustomLists = { Heading: "Heading", HeadingId, Lists: [] },
}) => {
    const dispatch = useDispatch();
    const handleClick = () =>
      dispatch(setSelectedSideBarLabelId(SideBarCustomLists["HeadingId"]));

    let isSelected = useSelector(
        (state) =>
            state.SideBarStates.selectedSideBarLabelId ===
            SideBarCustomLists["HeadingId"],
    );

    const isSideBarExpanded = useSelector(
        (state) => state.SideBarStates.sideBarExpanded,
    );

    let CustomListsHeadingClassName = `SideBarCustomListsHeading ${
        isSelected ? "Selected" : ""
    }`;

    let sideBarClassName = `SideBarContainer ${
        isSideBarExpanded ? "SideBarExpanded" : "SideBarCollapsed"
    }`;

    const [isCustomListsExpanded, setIsCustomListsExpanded] = useState(true);

    const toogleCustomListsDsiplay = () =>
        setIsCustomListsExpanded(!isCustomListsExpanded);

    SideBarDefaultLabels = SideBarDefaultLabels.map((item) => (
        <SideBarLabel
            title={item.title}
            icon={<Icon name={item.icon} size={"M"} />}
            id={item.id}
            number={item.number}
            key={item.id}
        />
    ));


    let customLists = SideBarCustomLists["Lists"].map((item) => (
        <SideBarLabel
            title={item.title}
            icon={<Icon name={item.icon} size={"M"} />}
            id={item.id}
            number={item.number}
            key={item.id}
        />
    ));

    return (
        <div className={sideBarClassName}>
            <nav className="SideBarNav">
                <SideBarHeader />
                <div className="SideBarDefaultLabels">
                    {SideBarDefaultLabels}
                </div>

                <div className={CustomListsHeadingClassName}>
                    <button onClick={handleClick}>
                        {SideBarCustomLists["Heading"]}{" "}
                    </button>
                    <div className="SideBarCustomListsHeadingIcons">
                        <button>
                            <Icon name={"IconPlus"} size={"XS"} />
                        </button>
                        <button
                            className={
                                !isCustomListsExpanded
                                    ? "SideBarCustomListsCollapsed"
                                    : ""
                            }
                            onClick={toogleCustomListsDsiplay}
                        >
                            <Icon name={"IconV"} size={"XS"} />
                        </button>
                    </div>
                </div>

                <div
                    className={`SideBarCustomLists ${
                        !isCustomListsExpanded
                            ? "SideBarCustomListsCollapsed"
                            : ""
                    }`}
                >
                    {customLists}
                </div>
            </nav>
        </div>
    );
};
export default SideBar;
