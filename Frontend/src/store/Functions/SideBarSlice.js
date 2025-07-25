import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice = createSlice({
    name: "SideBarStates",
    initialState: {
        selectedLabel: "Inbox",
        sideBarExpanded: true,
    },
    reducers: {
        setSelectedLabel: (state, action) => {
            state.selectedLabel = action.payload;
        },
        setSideBarExpantionState: (state, action) => {
            state.sideBarExpanded = action.payload;
        },
    }
});

export const { setSelectedLabel, setSideBarExpantionState } = SideBarSlice.actions;
export default SideBarSlice.reducer;