import "./TodoAddTask.css";
import Icon from "../../../utils/Icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import todoService from "../../../services/TodoServices";
import { addTodo } from "../../../store/Features/TodoSlice";
import { useParams } from "react-router-dom";
import TodoDatePicker from "../TodoDatePicker/TodoDatePicker";
import { getPrettyDate } from "../../../utils/prettyDate";
const TodoAddTask = ({ sectionName = "Not Sectioned" }) => {
    const { register, handleSubmit, reset, setFocus } = useForm();

    const { pageId } = useParams();
    const dispatch = useDispatch();

    const [dueDate, setDueDate] = useState(pageId === "today" ? new Date() : undefined);
    const [expandedDatePicker, setExpandedDatePicker] = useState(false);
    const [dateIconColor, setDateIconColor] = useState("var(--Disabled)");

    const [priority, setPriority] = useState(0);
    const [prioritySelectorExpanded, setPrioritySelectorExpanded] = useState(false);

    const view = useSelector((state) => state.TodoData.View);
    const [addingTask, setAddingTask] = useState(false);

    const contianerClassName = `TodoAddTaskContainer ${addingTask ? "AddingTask" : ""} ${view}View`;

    const email = useSelector((state) => state.AuthData.Email);
    const token = useSelector((state) => state.AuthData.Token);

    const addTaskClick = async (formData) => {
        if (!addingTask) {
            setFocus("task");
            setAddingTask(true);
        } else if (addingTask && !formData.task) {
            cancelAddingTask();
        } else {
            let todoId = `t ${
                String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
                Math.floor(Math.random() * 9)
            }`;

            const { message, success /* data */ } = await todoService.addTodo({
                email,
                token,
                todo: {
                    task: formData.task,
                    description: formData.description,
                    priority: priority,
                    dueDate: dueDate,
                    tagId: pageId,
                    sectionName: sectionName,
                },
            });

            let data = {
                task: formData.task,
                description: formData.description,
                priority: priority,
                dueDate: dueDate.toISOString(),
                tagId: pageId,
                sectionName: sectionName,
                completed: false,
                subtasks: {},
            };

            if (success) {
                dispatch(addTodo({ todoId, todo: data }));
                cancelAddingTask();
            }
        }
    };

    useEffect(() => {
        setDateIconColor(getPrettyDate(dueDate)[1]);
    }, [dueDate]);

    useEffect(() => {
        if (addingTask) {
            setFocus("task");
        }
    }, [addingTask]);

    const cancelAddingTask = () => {
        setAddingTask(false);
        reset();
        setExpandedDatePicker(false);
    };

    const expandDatePicker = () => {
        setExpandedDatePicker(!expandedDatePicker);
        setPrioritySelectorExpanded(false);
    };

    const expandPrioritySelector = () => {
        setPrioritySelectorExpanded(!prioritySelectorExpanded);
        setExpandedDatePicker(false);
    };

    return (
        <form className={contianerClassName} onSubmit={handleSubmit(addTaskClick)}>
            {addingTask && (
                <>
                    <div className="TodoAddTaskContentContainer">
                        <div className="TodoAddTaskInputContainer">
                            <input
                                type="text"
                                className="TodoAddTaskTitleInput"
                                placeholder="Task..."
                                {...register("task")}
                            />
                            <input
                                type="text"
                                className="TodoAddTaskDescriptionInput"
                                placeholder="Description..."
                                {...register("description")}
                            />
                        </div>

                        <div className="TodoAddTaskRightButtons">
                            <button
                                type="button"
                                className="TodoAddTaskDateButton"
                                onClick={expandDatePicker}
                                style={{ "--IconColor": dateIconColor }}
                            >
                                <Icon name={"IconCalendar2"} />
                            </button>

                            {expandedDatePicker && (
                                <div className="TodoAddTaskDatePickerContainer" onBlur={() => setExpandedDatePicker(false)}>
                                    <TodoDatePicker dueDate={dueDate} setDateValue={setDueDate} />
                                </div>
                            )}

                            <button
                                type="button"
                                className="TodoAddTaskPriorityButton"
                                id={`P${priority}Flag`}
                                onClick={expandPrioritySelector}
                            >
                                <Icon name={"IconFlag"} />
                            </button>

                            {prioritySelectorExpanded && (
                                <div className="TodoAddTaskPrioritySelectorContainer">
                                    <button
                                        id="P0Flag"
                                        type="button"
                                        onClick={() => setPriority(0)}
                                    >
                                        <Icon name={"IconFlag"} />
                                        <span>P0</span>
                                    </button>
                                    <button
                                        id="P1Flag"
                                        type="button"
                                        onClick={() => setPriority(1)}
                                    >
                                        <Icon name={"IconFlag"} />
                                        <span>P1</span>
                                    </button>
                                    <button
                                        id="P2Flag"
                                        type="button"
                                        onClick={() => setPriority(2)}
                                    >
                                        <Icon name={"IconFlag"} />
                                        <span>P2</span>
                                    </button>
                                    <button
                                        id="P3Flag"
                                        type="button"
                                        onClick={() => setPriority(3)}
                                    >
                                        <Icon name={"IconFlag"} />
                                        <span>P3</span>
                                    </button>
                                </div>
                            )}
                            <button type="button" className="TodoAddTaskMoreButton">
                                <Icon name={"IconDots3"} />
                            </button>
                        </div>
                    </div>

                    <div className="TodoAddTaskDivider" />
                </>
            )}

            <div className="TodoAddTaskBottomButtons">
                <button
                    type="button"
                    className="TodoAddTaskCancelButton"
                    onClick={cancelAddingTask}
                >
                    <Icon name={"IconPlusFilled"} />
                    <p>Cancel</p>
                </button>

                <button className="TodoAddTaskAddButton" type="submit">
                    <Icon name={"IconPlusFilled"} />
                    <p>Add Task</p>
                </button>
            </div>
        </form>
    );
};

export default TodoAddTask;
