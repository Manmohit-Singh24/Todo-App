import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: "TodoData",
    initialState: {
        Tags: {},
        Todos: {},
        View: "Board",
    },
    reducers: {
        setTodoTags: (state, action) => {
            state.Tags = action.payload.Tags;
        },
        setTodos: (state, action) => {
            state.Todos = action.payload.Todos;
        },

        setView: (state, action) => {
            state.View = action.payload.View;
        },

        toogleTodoCompleted: (state, action) => {
            state.Todos[action.payload.todoId].completed = action.payload.completed;
        },

        updateTodo: (state, action) => {
            state.Todos[action.payload.todoId] = action.payload.todo;
        },

        addTodo: (state, action) => {
            state.Todos[action.payload.todoId] = action.payload.todo;
        },
    },
});

export const { setTodoTags, setTodos, setView, toogleTodoCompleted, addTodo, updateTodo } =
    TodoSlice.actions;
export default TodoSlice.reducer;

/** Todo Object format : 
 * {
 *     id: 1 : {
            task: "Default Task",
            description: "Default Task Description",
            priority: 0,
            dueDate: //isoString Format
            subTasks: {},
            tagId:, // default "inbox"
            sectionName: , 
            completed : false
        }
}
 */

/**CustomList Object format :
    {
        pageId : {
            title = 'SideBarLabel',
            sections = [],
            number = ''
        }
    }
     */

/** View Object format :
    {
        pageId-1 : "List"
        pageId-2 : "Board"
    }
     */
