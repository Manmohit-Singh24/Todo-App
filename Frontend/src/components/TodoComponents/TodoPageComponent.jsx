import "./TodoPageComponent.css";
import { TodoTaskCard, TodoSection, TodoAddTask } from "../";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPrettyDate, prettyDatecolors, prettyTodayString } from "../../utils/prettyDate";
const TodoPageComponent = ({}) => {
    const { pageId } = useParams();

    const view = useSelector((state) => state.TodoData.View);

    const heading = (() => {
        const title = useSelector((state) => state.TodoData.Tags[pageId]?.title);
        const result = (title || pageId).toString();
        return result.charAt(0).toUpperCase() + result.slice(1);
    })();

    const todos = useSelector((state) => state.TodoData.Todos);
    const sections = useSelector((state) => state.TodoData.Tags[pageId]?.sections);

    const sectionSortedTodos =
        pageId === "today"
            ? { Overdue: {}, [`${prettyTodayString} , Today`]: {}, Completed: {} }
            : pageId === "upcoming"
            ? { Upcoming: {}, Completed: {} }
            : { ...Object.fromEntries(sections.map((key) => [key, {}])), Completed: {} };

    for (let todoId in todos) {
        let todo = todos[todoId];

        switch (pageId) {
            case "today":
                let prettyDate = getPrettyDate(todo.dueDate);

                if (
                    (prettyDate[0] === "Today" || prettyDate[1] === prettyDatecolors.overdue) &&
                    todo.completed
                )
                    sectionSortedTodos.Completed[todoId] = todo;
                else if (prettyDate[0] === "Today")
                    sectionSortedTodos[`${prettyTodayString} , Today`][todoId] = todo;
                else if (prettyDate[1] === prettyDatecolors.overdue)
                    sectionSortedTodos["Overdue"][todoId] = todo;

                break;
            case "upcoming":
                break;
            default:
                if (todo.tagId === pageId) {
                    if (todo.completed) sectionSortedTodos.Completed[todoId] = todo;
                    else sectionSortedTodos[todo.sectionName][todoId] = todo;
                }
        }
    }

    let sectionComponents = [];
    for (let section in sectionSortedTodos) {
        sectionComponents?.push(
            <TodoSection sectionName={section} todos={sectionSortedTodos[section]} key={section} />,
        );
    }

    return (
        <div className={`TodoPageComponentContainer ${view}View`}>
            <div className="TodoPageComponentHeader"></div>
            <div className="TodoPageComponentHeading">{heading}</div>
            <div className={`TodoPageComponentSectionsContainer ${view}View`}>
                {" "}
                {sectionComponents}
            </div>
        </div>
    );
};

export default TodoPageComponent;
