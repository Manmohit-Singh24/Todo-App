import { useState, useId } from "react";
import TodoCheckBox from "../TodoCheckBox/TodoCheckBox";
import "./TodoTaskCard.css";
import Icon from "../../../utils/Icons";

const getPrettyDate = (date) => {
    let formattedDate;
    let color;

    // Today :
    const today = {
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        day: new Date().getDay(),
    };

    let isLeapYear =
        (today.year % 4 === 0 && today.year % 100 !== 0) ||
        today.year % 400 === 0;

    const months = {
        1: ["Jan", 31],
        2: ["Feb", isLeapYear ? 29 : 28],
        3: ["Mar", 31],
        4: ["Apr", 30],
        5: ["May", 31],
        6: ["Jun", 30],
        7: ["Jul", 31],
        8: ["Aug", 31],
        9: ["Sep", 30],
        10: ["Oct", 31],
        11: ["Nov", 30],
        12: ["Dec", 31],
    };

    const dayNames = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };

    const colors = {
        overdue: "#d1453b",
        today: "#4B9244",
        tomorrow: "#E69641",
        thisWeek: "#8647D9",
        thisYear: "#0071ff",
        future: "var(--Disabled)",
    };

    if (today.year == date.year) {

        // Today
        if (today.month == date.month && today.date == date.date) {
            formattedDate = "Today";
            color = colors.today;
        }
        //Tomorrow
        else if (
            (today.month == date.month && date.date - today.date === 1) ||
            (date.month - today.month === 1 && date.date === 1)
        ) {
            formattedDate = "Tomorrow";
            color = colors.tomorrow;
        }
        // Within a week
        else if (
            (today.month == date.month && date.date - today.date <= 7) ||
            (date.month - today.month === 1 &&
                date.date + today.date - months[today.month][1] <= 7)
        ) {
            const dateDay = (today.day + date.date) % 7;
            formattedDate = dayNames[dateDay];
            color = colors.thisWeek;
        }
        // Within a year
        else {
            formattedDate = `${date["date"]} ${months[date["month"]][0]}`;
            if (today.month > date.month) color = colors.overdue;
            else color = colors.thisYear;
        }
    }
    // Not This Year
    else {
        formattedDate = `${date["date"]} ${months[date["month"]][0]} ${
            date["year"]
        }`;

        if (today.year - date.year > 0) color = colors.overdue;
        else color = colors.future;
    }

    return [formattedDate, color];
};

const TodoTaskCard = ({
    id = useId(),
    task = "Default Task", // TODO : Make a function to parse task to shorten it if long , like "Default Task Is Too Long"=> Default Task...
    description = "Default Description", // TODO : Make a function to parse description to shorten it if long
    priority = 0,
    subTasks = [],
    dueDate = {
        date: 1,
        month: 5,
        year: 2000,
    },
    tag = "abc",
    view = "Board",
}) => {

    const [checked, setChecked] = useState(false);
    const [expandSubTasks, setExpandSubTasks] = useState(false);

    const cardClassName = `TodoTaskCard ${checked ? "Checked" : ""}
    ${view === "Board" ? "BoardView" : "ListView"}
    ${expandSubTasks ? "ExpandedSubTasks" : ""}`;

    const [dueDatePretty, dateColor] = getPrettyDate(dueDate);

    const subTasksArray =
        subTasks &&
        subTasks["remaining"] &&
        subTasks["remaining"].map((subTask) => {
            return (
                <div className="TodoTaskCardSubTask" key={subTask.id}>
                    <TodoTaskCard
                        id={subTask.id}
                        task={subTask.task}
                        description={subTask.description}
                        priority={subTask.priority}
                        dueDate={subTask.dueDate}
                        tag={subTask.tag}
                        subTasks={subTask.subTasks}
                    />
                </div>
            );
        });

    return (
        <div className={cardClassName} id={`P${priority}`}>
            <div className="TodoTaskCardLeftIcons">
                <button className="TodoTaskCardDragIcon">
                    <Icon name={"IconDrag"} size="XS" />
                </button>
                {view === "List" && subTasks.total > 0 && (
                    <button
                        className="TodoTaskCardVIcon"
                        onClick={() => setExpandSubTasks(!expandSubTasks)}
                    >
                        <Icon name={"IconV"} size="XS" />
                    </button>
                )}
            </div>
            <div className="TodoTaskCardTaskSubTaskContainer">
                <div className="TodoTaskCardContainer">
                    <TodoCheckBox setChecked={setChecked} priority={priority} />

                    <div className="TodoTaskCardTask">{task}</div>

                    <div className="TodoTaskCardDescription">{description}</div>

                    {subTasks.total > 0 && !expandSubTasks && (
                        <div className="TodoTaskCardSubTasksIcon">
                            <Icon name={"IconList2"} size="S" />
                            <span>
                                {subTasks.remaining.length}/{subTasks.total}
                            </span>
                        </div>
                    )}
                    {dueDate && (
                        <button
                            style={{ "--fill": dateColor }}
                            className="TodoTaskCardDueDate"
                        >
                            <Icon name={"IconCalendar2"} size="S" />
                            <span>{dueDatePretty} </span>
                        </button>
                    )}
                    {tag && (
                        <button className="TodoTaskCardTag">
                            <Icon name={"IconTag"} size="S" />
                            <span>{tag} </span>
                        </button>
                    )}
                </div>
                {view === "List" && subTasks.total > 0 && expandSubTasks && (
                    <div className="TodoTaskCardSubTasks">{subTasksArray}</div>
                )}
            </div>
        </div>
    );
};

export default TodoTaskCard;

// expected subtask :
// subTasks = {
//     remaining : [
//         {
//             id: useId(),
//             task: "Default Subtask",
//             description: "Default Subtask Description",
//             priority: 0,
//             dueDate: {
//                 date: 1,
//                 month: 1,
//                 year: 2000,
//             },
//             subTasks: [],
//         },
//         {
//             id: useId(),
//             task: "Default Subtask",
//             description: "Default Subtask Description",
//             priority: 1,
//             dueDate: {
//                 date: 1,
//                 month: 5,
//                 year: 2030,
//             },
//             subTasks: [],
//         },
//     ],
//     completed: [],
//     total: 1,
// },
