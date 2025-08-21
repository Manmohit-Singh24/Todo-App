import { useState, useId, useRef, useEffect } from "react";
import TodoCheckBox from "../TodoCheckBox/TodoCheckBox";
import "./TodoTaskCard.css";
import Icon from "../../../utils/Icons";
import { getPrettyDate } from "../../../utils/prettyDate";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import todoService from "../../../services/TodoServices";
import {
    toogleTodoCompleted,
    updateTodo,
    setEditingTaskId,
} from "../../../store/Features/TodoSlice";
import TodoDatePicker from "../TodoDatePicker/TodoDatePicker";

const TodoTaskCard = ({ id = useId(), parentTaskCompleted = false, view }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        task = "Default Task",
        description = "Default Description",
        priority = 4,
        subTasks = {},
        dueDate = null,
        sectionId = "NotSectioned-inbox",
        completed = false,
        isSubTask = false,
    } = useSelector((state) => state.TodoData.Todos[id]) || {};

    const section = useSelector((state) => state.TodoData.Sections[sectionId]);
    const sectionName = section?.sectionName;
    const tagId = section?.tagId;

    const [expandSubTasks, setExpandSubTasks] = useState(false);
    const [expandDatePicker, setExpandedDatePicker] = useState(false);

    view = view || useSelector((state) => state.TodoData.View);
    const tag = useSelector((state) => state.TodoData.Tags[tagId]);
    const tagName = tag?.title;
    const tagColor = tag?.tagColor;
    const cardClassName = `TodoTaskCard ${parentTaskCompleted || completed ? "Checked" : ""}
    ${view}View
    ${expandSubTasks ? "ExpandedSubTasks" : ""}`;

    const [dueDatePretty, dateColor] = getPrettyDate(dueDate);

    let subTasksRemaining = [];
    let subTasksCompleted = [];

    const subTasksState = useSelector((state) =>
        Object.entries(subTasks)
            .sort((a, b) => a[1] - b[1])
            .map(([id]) => ({
                id,
                completed: state.TodoData.Todos[id]?.completed || false,
            })),
    );

    for (const { id, completed : subTaskCompleted } of subTasksState) {
        const subTaskCard = (
            <div className="TodoTaskCardSubTask" key={id}>
                <TodoTaskCard
                    id={id}
                    parentTaskCompleted={parentTaskCompleted || completed}
                    view={view}
                />
            </div>
        );

        if (subTaskCompleted) {
            subTasksCompleted.push(subTaskCard);
        } else {
            subTasksRemaining.push(subTaskCard);
        }
    }

    let subTasksTotal = subTasksRemaining.length + subTasksCompleted.length;

    const toogleCompleted = async () => {
        const { message, success, data } = await todoService.ToggleCompletedTodo(id);

        if (success) {
            dispatch(
                toogleTodoCompleted({
                    todoId: id,
                    completed: !completed,
                }),
            );
        }
    };

    const dateChange = (date) => {
        dispatch(
            updateTodo({
                todoId: id,
                todo: { dueDate: date?.toString() },
            }),
        );
    };

    const datePickerRef = useRef(null);

    useEffect(() => {
        if (expandDatePicker) {
            datePickerRef.current.focus();
        }
    }, [expandDatePicker]);

    const editTask = () => {
        dispatch(setEditingTaskId({ todoId: id }));
    };

    return (
        <div className={cardClassName} id={`P${priority}`}>
            <div className="TodoTaskCardLeftIcons">
                <button className="TodoTaskCardDragIcon">
                    <Icon name={"IconDrag"} size="XS" />
                </button>
                {view === "List" && subTasksTotal > 0 && (
                    <button
                        className="TodoTaskCardVIcon"
                        onClick={() => setExpandSubTasks(!expandSubTasks)}
                    >
                        <Icon name={"IconV"} size="XS" />
                    </button>
                )}
            </div>
            <div className="TodoTaskCardTaskAndSubTaskContainer">
                <div className="TodoTaskCardContainer" onClick={editTask}>
                    <TodoCheckBox
                        checked={parentTaskCompleted || completed}
                        setChecked={toogleCompleted}
                        priority={priority}
                    />

                    <div className="TodoTaskCardTask">{task}</div>

                    <div className="TodoTaskCardDescription">{description}</div>

                    {!expandSubTasks && subTasksTotal > 0 && (
                        <div className="TodoTaskCardSubTasksIcon">
                            <Icon name={"IconList2"} size="S" />
                            <span>
                                {subTasksRemaining.length}/{subTasksTotal}
                            </span>
                        </div>
                    )}

                    <button
                        style={{ "--fill": dateColor }}
                        className="TodoTaskCardDueDate"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!completed) setExpandedDatePicker(!expandDatePicker);
                        }}
                    >
                        <Icon name={"IconCalendar2"} size="S" />
                        <span>{dueDatePretty} </span>
                    </button>

                    {!isSubTask && tagName && (
                        <button
                            className="TodoTaskCardTag"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/app/todo/${tagId}`);
                            }}
                            style={{ "--color": tagColor }}
                        >
                            <Icon name={"IconTag"} size="S" />
                            <span>
                                {tagName}
                                {sectionName != "Not Sectioned" && `/${sectionName}`}{" "}
                            </span>
                        </button>
                    )}
                    {expandDatePicker && (
                        <div
                            className="TodoTaskCardDatePicker"
                            ref={datePickerRef}
                            tabIndex={0}
                            onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget)) {
                                    setExpandedDatePicker(false); // only close if clicked outside
                                    console.log("clicked outside");
                                }
                            }}
                        >
                            <TodoDatePicker dueDate={dueDate} setDateValue={dateChange} />
                        </div>
                    )}
                </div>
                {view === "List" && expandSubTasks && subTasksTotal > 0 && (
                    <div className="TodoTaskCardSubTasks">
                        {subTasksRemaining}

                        <div>{subTasksCompleted}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoTaskCard;
