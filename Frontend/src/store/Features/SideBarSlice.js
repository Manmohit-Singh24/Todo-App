import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice = createSlice({
    name: "SideBarStates",
    initialState: {
        selectedSideBarLabelId: 0,
        sideBarExpanded: true,
    },
    reducers: {
        setSelectedSideBarLabelId: (state, action) => {
            state.selectedSideBarLabelId = action.payload;
        },
        setSideBarExpantionState: (state, action) => {
            state.sideBarExpanded = action.payload;
        },
    }
});

export const { setSelectedSideBarLabelId, setSideBarExpantionState } = SideBarSlice.actions;
export default SideBarSlice.reducer;