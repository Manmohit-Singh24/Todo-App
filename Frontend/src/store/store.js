import { configureStore } from "@reduxjs/toolkit";

import AuthData from "./Features/AuthSlice";
import TodoData from "./Features/TodoSlice";

export const store = configureStore({
    reducer: {
        AuthData: AuthData,
        TodoData: TodoData,
    },
});
