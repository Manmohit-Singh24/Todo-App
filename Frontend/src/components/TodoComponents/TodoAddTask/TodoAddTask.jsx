import "./TodoAddTask.css";
import Icon from "../../../utils/Icons";
import { useState } from "react";
const TodoAddTask = () => {
    const view = "Board";
    const [addingTask, setAddingTask] = useState(true);

    const contianerClassName = `TodoAddTaskContainer ${
        addingTask ? "AddingTask" : ""
    } ${view === "Board" ? "BoardView" : "ListView"}`;

    return (
        <div className={contianerClassName}>
            {addingTask && (
                <>
                    <div className="TodoAddTaskContentContainer">
                        <div className="TodoAddTaskInputContainer">
                            <input
                                type="text"
                                className="TodoAddTaskTitleInput"
                                placeholder="Task..."
                            />
                            <input
                                type="text"
                                className="TodoAddTaskDescriptionInput"
                                placeholder="Description..."
                            />
                        </div>

                        <div className="TodoAddTaskRightButtons">
                            <button className="TodoAddTaskDateButton">
                                <Icon name={"IconCalendar2"} />
                            </button>

                            <button className="TodoAddTaskPriorityButton">
                                <Icon name={"IconFlag"} />
                            </button>

                            <button className="TodoAddTaskMoreButton">
                                <Icon name={"IconDots3"} />
                            </button>
                        </div>
                    </div>

                    <div className="TodoAddTaskDivider" />
                </>
            )}

            <div className="TodoAddTaskBottomButtons">
                <button className="TodoAddTaskCancelButton">
                    <Icon name={"IconPlusFilled"} />
                    <p>Cancel</p>
                </button>

                <button
                    className="TodoAddTaskAddButton"
                    onClick={() => setAddingTask(!addingTask)}
                >
                    <Icon name={"IconPlusFilled"} />
                    <p>Add Task</p>
                </button>
            </div>
        </div>
    );
};

export default TodoAddTask;
