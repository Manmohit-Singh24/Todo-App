import { useState, useId } from "react";
import TodoCheckBox from "../TodoCheckBox/TodoCheckBox";
import "./TodoTaskCard.css";
import Icon from "../../../utils/Icons";
import { getPrettyDate } from "../../../utils/prettyDate";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import todoService from "../../../services/TodoServices";
import { toogleTodoCompleted, updateTodo } from "../../../store/Features/TodoSlice";
import TodoDatePicker from "../TodoDatePicker/TodoDatePicker";
const TodoTaskCard = ({
    id = useId(),
    task = "Default Task",
    description = "Default Description",
    priority = 0,
    subTasks = {},
    dueDate = undefined,
    tagId = "inbox",
    sectionName = "Not Sectioned",
    completed = false,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [expandSubTasks, setExpandSubTasks] = useState(false);
    const [expandDatePicker, setExpandedDatePicker] = useState(false);

    const view = useSelector((state) => state.TodoData.View);
    const tagName = useSelector((state) => state.TodoData.Tags[tagId]?.title);

    const cardClassName = `TodoTaskCard ${completed ? "Checked" : ""}
    ${view}View
    ${expandSubTasks ? "ExpandedSubTasks" : ""}`;

    const [dueDatePretty, dateColor] = getPrettyDate(dueDate);

    let subTasksRemaining = [];
    let subTasksCompleted = [];

    for (const subTaskId in subTasks) {
        const subTask = subTasks[subTaskId];
        const subTaskCard = (
            <div className="TodoTaskCardSubTask" key={subTaskId}>
                <TodoTaskCard
                    id={subTaskId}
                    task={subTask?.task}
                    description={subTask?.description}
                    priority={subTask?.priority}
                    dueDate={subTask?.dueDate}
                    tag={subTask?.tag}
                    subTasks={subTask?.subTasks}
                    completed={subTask?.completed}
                />
            </div>
        );

        if (subTask.completed) {
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
                todo: { dueDate: date.toISOString() },
            }),
        );
    };

    return (
        <div className={cardClassName} id={`P${priority}`} >
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
                <div className="TodoTaskCardContainer">
                    <TodoCheckBox
                        checked={completed}
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
                        onClick={() => setExpandedDatePicker(!expandDatePicker)}
                    >
                        <Icon name={"IconCalendar2"} size="S" />
                        <span>{dueDatePretty} </span>
                    </button>

                    {expandDatePicker && (
                        <div className="TodoTaskCardDatePicker" onBlur={() => setExpandedDatePicker(false)}>
                            <TodoDatePicker dueDate={dueDate} setDateValue={dateChange} />
                        </div>
                    )}

                    {tagName && (
                        <button
                            className="TodoTaskCardTag"
                            onClick={() => navigate(`/app/todo/${tagId}`)}
                        >
                            <Icon name={"IconTag"} size="S" />
                            <span>
                                {tagName}
                                {sectionName != "Not Sectioned" && `/${sectionName}`}{" "}
                            </span>
                        </button>
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
