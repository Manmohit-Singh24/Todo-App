import "./TodoPageComponent.css";
import { TodoSection, TodoAddSection } from "../";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TodoEditTask from "./TodoEditTask/TodoEditTask";
const TodoPageComponent = ({}) => {
    const { tagId } = useParams();

    if (tagId === "upcoming") return <></>; // TODO :remove this later

    const view = useSelector((state) => state.TodoData.View);
    const edittingTaskId = useSelector((state) => state.TodoData.EditingTaskId);

    const heading = useSelector((state) => {
        const title = (state.TodoData.Tags[tagId]?.title || tagId).toString();
        return title.charAt(0).toUpperCase() + title.slice(1);
    });

    let sortedSections = useSelector((state) => {
        return Object.entries(state.TodoData.Tags[tagId]?.sections || {})
            .sort((a, b) => a[1] - b[1]) // sort by order value
            .map(([id]) => id); // extract only the todoIds if needed;
    });

    let sectionComponents = sortedSections?.map((sectionId) => {
        if ( tagId !== "today" && sectionId.split("-")[0] === "Completed") {
            return (
                <>
                    <TodoAddSection />
                    <TodoSection sectionId={sectionId} key={sectionId} />
                </>
            );
        }else return <TodoSection sectionId={sectionId} key={sectionId} />;
    }) || <></>;

    return (
        <div className={`TodoPageComponentContainer ${view}View`}>
            <div className="TodoPageComponentHeading">{heading}</div>
            <div className={`TodoPageComponentSectionsContainer ${view}View`}>
                {sectionComponents}
                {edittingTaskId && <TodoEditTask id={edittingTaskId} />}
            </div>
        </div>
    );
};

export default TodoPageComponent;
