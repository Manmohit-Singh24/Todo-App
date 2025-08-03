import "./TodoSectionHeading.css";
import Icon from "../../../utils/Icons";
import { useState } from "react";
const TodoSectionHeading = ({
    heading = "Default Heading",
    IncludedTasks = {
        total: 1,
        completed: 0,
        remaining: 0,
    },
}) => {
    const [view, setView] = useState("List");
    const [expandedIncludedTasks, setExpandedIncludedTasks] = useState(true);

    const containerClass =  `TodoSectionHeadingContainer ${
        view === "Board" ? "BoardView" : "ListView"
        } ${expandedIncludedTasks ? "Expanded" : ""}`;
    
    return (
        <div className={containerClass}>
            <div className="TodoSectionHeadingLeftIcons">
                <button className="TodoSectionHeadingDragIcon">
                    <Icon name={"IconDrag"} size="XS" />
                </button>
                {view === "List" && IncludedTasks.total > 0 && (
                    <button
                        className="TodoSectionHeadingVIcon"
                        onClick={() =>
                            setExpandedIncludedTasks(!expandedIncludedTasks)
                        }
                    >
                        <Icon name={"IconV"} size="XS" />
                    </button>
                )}
            </div>

            <div className="TodoSectionHeadingContent">
                <h2>{heading}</h2>
                <p>{IncludedTasks.remaining}</p>
            </div>

            <div className="TodoSectionHeadingRightIcons">
                <button className="TodoSectionHeadingMoreIcon">
                    <Icon name={"IconDots3"} size="XS" />
                </button>
            </div>

            <div className = "TodoSectionHeadingBorder" />
        </div>
    );
};

export default TodoSectionHeading;
