import "./SideBar.css";
import Icon from "../../../utils/Icons";
import SideBarHeader from "./SideBarHeader/SideBarHeader";
import SideBarLabel from "./SideBarLabel/SideBarLabel";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const { pageType, pageId } = useParams();

    const [isSideBarExpanded, setIsSideBarExpanded] = useState(true);
    const [isCustomListsExpanded, setIsCustomListsExpanded] = useState(true);

    const handleClick = (labelId) =>
        navigate(pageType === "notes" ? `app/notes/${labelId}` : `/app/todo/${labelId}`);

    const SideBarDefaultLabels = (
        pageType === "notes"
            ? []
            : [
                  { title: "Today", icon: "IconCalendarToday", id: "today" }, // Later we will retrieve id from backend , id will help to organise tasks easily among labels
                  { title: "Inbox", icon: "IconInbox", id: "inbox" },
                  { title: "Upcoming", icon: "IconCalendar1", id: "upcoming" },
              ]
    ).map((item) => (
        <SideBarLabel
            title={item.title}
            icon={<Icon name={item.icon} size={"M"} />}
            id={item.id}
            number={item.number || ""}
            key={item.id}
            selected={item.id === pageId}
            onClick={() => handleClick(item.id)}
        />
    ));

    const Tags = pageType === "notes" ? [] : useSelector((state) => state.TodoData.Tags);

    const SideBarCustomLists = Object.keys(Tags).map(
        (labelId) =>
            labelId !== "inbox" && (
                <SideBarLabel
                    title={Tags[labelId]?.title}
                    icon={<Icon name={"IconList2"} size={"M"} />}
                    id={labelId}
                    number={Tags[labelId]?.number || ""}
                    key={labelId}
                    selected={labelId === pageId}
                    onClick={() => handleClick(labelId)}
                />
            ),
    );

    let Heading = pageType === "notes" ? "My NoteBooks" : "My Projects";

    return (
        <div
            className={`SideBarContainer ${
                isSideBarExpanded ? "SideBarExpanded" : "SideBarCollapsed"
            }`}
        >
            <nav className="SideBarNav">
                {/* --------------------- SideBarHeader --------------------- */}
                <SideBarHeader toogleExpansion={() => setIsSideBarExpanded(!isSideBarExpanded)} />

                {/* --------------------- SideBarDefaultLabels --------------------- */}
                <div className="SideBarDefaultLabels">{SideBarDefaultLabels}</div>

                {/* --------------------- SideBarCustomListsHeading --------------------- */}
                <div className="SideBarCustomListsHeading">
                    <button>{Heading}</button>

                    <div className="SideBarCustomListsHeadingIcons">
                        <button>
                            <Icon name={"IconPlus"} size={"XS"} />
                        </button>

                        <button
                            className={isCustomListsExpanded ? "" : "SideBarCustomListsCollapsed"}
                            onClick={() => setIsCustomListsExpanded(!isCustomListsExpanded)}
                        >
                            <Icon name={"IconV"} size={"XS"} />
                        </button>
                    </div>
                </div>

                {/* --------------------- SideBarCustomLists --------------------- */}
                <div
                    className={`SideBarCustomLists ${
                        isCustomListsExpanded ? "" : "SideBarCustomListsCollapsed"
                    }`}
                >
                    {SideBarCustomLists}
                </div>
            </nav>
        </div>
    );
};
export default SideBar;
