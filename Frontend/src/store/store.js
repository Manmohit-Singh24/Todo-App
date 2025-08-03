import { configureStore } from "@reduxjs/toolkit";

import SideBarStates from "./Features/SideBarSlice";
import AuthData from "./Features/AuthSlice";
import TodoData from "./Features/TodoSlice";

export const store = configureStore({
    reducer: {
        SideBarStates: SideBarStates,
        AuthData: AuthData,
        TodoData: TodoData,
    },
});
