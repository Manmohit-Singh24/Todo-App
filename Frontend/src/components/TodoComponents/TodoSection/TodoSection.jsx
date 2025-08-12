import "./TodoSection.css";
import Icon from "../../../utils/Icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import TodoTaskCard from "../TodoTaskCard/TodoTaskCard";
import TodoAddTask from "../TodoAddTask/TodoAddTask";
const TodoSection = ({ sectionName = "Default Heading", todos = [] }) => {
    const view = useSelector((state) => state.TodoData.View);
    const [collapsedTask, setCollapsedTasks] = useState(false);

    const containerClass = `TodoSectionContainer ${view}View ${collapsedTask ? "Collapsed" : ""}`;

    const todosComponents = [];

    for (const todoId in todos) {
        todosComponents.push(<TodoTaskCard key={todoId} id={todoId} {...todos[todoId]} />);
    }

    return (
        <div className={containerClass}>
            {/*------------------ Section Heading ------------------ */}
            <div className="TodoSectionHeadingContainer">
                <div className="TodoSectionHeadingLeftIcons">
                    <button className="TodoSectionHeadingDragIcon">
                        <Icon name={"IconDrag"} size="XS" />
                    </button>

                    <button
                        className="TodoSectionHeadingVIcon"
                        onClick={() => setCollapsedTasks(!collapsedTask)}
                    >
                        <Icon name={"IconV"} size="XS" />
                    </button>
                </div>

                <div className="TodoSectionHeadingContent">
                    <h2>{sectionName}</h2>
                    <p>{todos.length}</p>
                </div>

                <div className="TodoSectionHeadingRightIcons">
                    <button className="TodoSectionHeadingMoreIcon">
                        <Icon name={"IconDots3"} size="XS" />
                    </button>
                </div>

                <div className="TodoSectionHeadingBorder" />
            </div>

            {/*------------------ Section Todos ------------------ */}
            <div className="TodoSectionContent">
                <div className="TodoSectionTodos">{todosComponents}</div>

                {sectionName !== "Completed" && sectionName !== "Overdue" && (
                    <div className="TodoSectionAddTask">
                        <TodoAddTask sectionName={sectionName} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoSection;
