import { configureStore } from "@reduxjs/toolkit";

import AuthData from "./Features/AuthSlice";
import TodoData from "./Features/TodoSlice";
import GeneralData from "./Features/GeneralSlice";

export const store = configureStore({
    reducer: {
        AuthData: AuthData,
        TodoData: TodoData,
        GeneralData: GeneralData,
    },
});
