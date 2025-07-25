import { configureStore } from "@reduxjs/toolkit";

import SideBarStates from "./Functions/SideBarSlice";

export const store = configureStore({
    reducer: {
        SideBarStates: SideBarStates,
    },
});
