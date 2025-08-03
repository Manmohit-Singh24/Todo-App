import "./TodoPageComponent.css";
import {
    TodoTaskCard,
    TodoSectionHeading,
    TodoAddTask,
} from "../";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSideBarLabelId } from "../../store/Features/SideBarSlice";
import { useEffect } from "react";
import Icon from "../../utils/Icons";

const TodoPageComponent = ({ selectedSideBarLabelId }) => {
    const dispatch = useDispatch();
    
    const CusotomLists = useSelector((state) => state.TodoData.CusotomLists);

    return (
        <div className="TodoPageComponentContainer">
            <div className="TodoPageComponentHeading">Inbox</div>
            <TodoTaskCard dueDate={{ date: 1, month: 1, year: 2024 }} />
            <TodoTaskCard
                priority={1}
                subTasks={{
                    remaining: [
                        {
                            id: "x1",
                            task: "Default Subtask",
                            description: "Default Subtask Description",
                            priority: 0,
                            dueDate: {
                                date: 1,
                                month: 1,
                                year: 2000,
                            },
                            subTasks: [],
                        },
                        {
                            id: "x2",
                            task: "Default Subtask",
                            description: "Default Subtask Description",
                            priority: 1,
                            dueDate: {
                                date: 1,
                                month: 5,
                                year: 2030,
                            },
                            subTasks: [],
                        },
                    ],
                    completed: [],
                    total: 1,
                }}
                dueDate={{ date: 31, month: 7, year: 2025 }}
            />
            <TodoTaskCard
                priority={2}
                dueDate={{ date: 1, month: 8, year: 2025 }}
            />
            <TodoTaskCard
                priority={2}
                dueDate={{ date: 5, month: 8, year: 2025 }}
            />
            <TodoTaskCard
                priority={3}
                dueDate={{ date: 1, month: 11, year: 2025 }}
            />
            <TodoTaskCard
                priority={3}
                dueDate={{ date: 1, month: 11, year: 2026 }}
            />

            <TodoAddTask />
            <TodoSectionHeading />
        </div>
    );
};

export default TodoPageComponent;
