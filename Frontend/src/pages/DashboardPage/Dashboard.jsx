import "./Dashboard.css";
import { SideBar, TodoPageComponent } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setTags, setTodos, setSections, setHighestTagOrder } from "../../store/Features/TodoSlice";
import todoService from "../../services/TodoServices";
import { useEffect, useState } from "react";
import { getPrettyDate, prettyDatecolors, prettyTodayString } from "../../utils/prettyDate";
import { ConfirmDeleteAlert, DashboardHeader } from "../../components";
const Dashboard = () => {
    const dispatch = useDispatch();
    const [pageContainer, setPageContainer] = useState(<></>);
    const email = useSelector((state) => state.AuthData.Email);
    const token = useSelector((state) => state.AuthData.Token);

    const loadTodos = async () => {
        const { message, success, data } = await todoService.fetchTodos({
            email,
            token,
        });
        console.log(message);

        if (success) {
            let highestOrderTag = 0;
            let tags = {
                ...data.tags,
                today: {
                    title: "Today",
                },
            };

            let sections = {
                ...data.sections,
                Overdue: { sectionName: "Overdue", tagId: "today", order: 1 },
                Today: { sectionName: `Today - ${prettyTodayString}`, tagId: "today", order: 2 },
            };

            let todos = data.todos;

            for (let tagId in tags) {
                tags[tagId].sections = {};
                tags[tagId].highestSectionOrder = 0;

                let order = tags[tagId].order;
                if (order > highestOrderTag && (!order === Infinity || !order === -Infinity))
                    highestOrderTag = tags[tagId].order;

                sections[`Completed-${tagId}`] = {
                    sectionName: "Completed",
                    tagId,
                    order: Infinity,
                };
            }

            for (let sectionId in sections) {
                sections[sectionId].todos = {};
                sections[sectionId].highestTodoOrder = 0;
                sections[sectionId].number = 0;

                let parentTagId = sections[sectionId].tagId;

                tags[parentTagId].sections[sectionId] = sections[sectionId].order;
                                
                let order = sections[sectionId].order; ;
                if (
                    order > tags[parentTagId].highestSectionOrder &&
                    (!order === Infinity || !order === -Infinity)
                )
                    tags[parentTagId].highestSectionOrder = sections[sectionId].order;

            }

            for (let todoId in todos) {
                if (todos[todoId].isSubTask) {
                    let parentTodoId = todos[todoId].parentTodoId;

                    if (!todos[parentTodoId].hasOwnProperty("subTasks"))
                        todos[parentTodoId].subTasks = {};

                    todos[parentTodoId].subTasks[todoId] = todos[todoId].order;
                } else {
                    let sectionId = todos[todoId].sectionId;
                    let completedSectionId = `Completed-${sections[todos[todoId].sectionId].tagId}`;

                    let order = todos[todoId].order;
                    if (order > sections[sectionId].highestTodoOrder && (!order === Infinity || !order === -Infinity))
                        sections[sectionId].highestTodoOrder = todos[todoId].order;

                    sections[sectionId].todos[todoId] = todos[todoId].order;
                    sections[completedSectionId].todos[todoId] = todos[todoId].order;
                    !todos[todoId].completed && sections[sectionId].number++;
                }

                let prettyDate = getPrettyDate(todos[todoId].dueDate);

                if (prettyDate[0] === "Today") {
                    sections.Today.todos[todoId] = todos[todoId].order;
                    sections["Completed-today"].todos[todoId] = todos[todoId].order;
                    !todos[todoId].completed && sections.Today.number++;
                } else if (!todos[todoId].completed && prettyDate[1] === prettyDatecolors.overdue) {
                    sections.Overdue.todos[todoId] = todos[todoId].order;
                    sections.Today.number++;
                }
            }

            // console.log("Tags : ", tags);
            // console.log("Sections : ", sections);
            // console.log("Todos : ", todos);

            dispatch(setTodos({ Todos: todos }));
            dispatch(setTags({ Tags: tags }));
            dispatch(setSections({ Sections: sections }));
            dispatch(setHighestTagOrder({ highestTagOrder: highestOrderTag }));
            setPageContainer(<TodoPageComponent />);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <div className="Dashboard">
            <DashboardHeader />
            <SideBar />
            <main className="DashboardMainContainer">{pageContainer}</main>
            <footer></footer>
            <ConfirmDeleteAlert />
        </div>
    );
};

export default Dashboard;
