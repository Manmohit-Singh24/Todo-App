import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: "TodoData",
    initialState: {
        CusotomLists: {},
        Todos: [],
    },
    reducers: {
        setTodoData: (state, action) => {
            state.CusotomLists = action.payload.CusotomLists;
            state.Todos = action.payload.Todos;
        },
    },
});

export const { setTodoData } = TodoSlice.actions;
export default TodoSlice.reducer;
