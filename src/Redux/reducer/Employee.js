import { createReducer } from "@reduxjs/toolkit"

const initialvalue ={}
export const EmpReducer = createReducer(initialvalue,{
    // For Company
    getAssignedTaskRequest: (state,) => {
        state.loading = true;
    },
    getAssignedTaskSuccess: (state, action) => {
        state.loading = false;
        state.getAsignTask = action.payload
    },
    getAssignedTaskFailuer: (state, action) => {
        state.loading = true;
        state.getAsignTaskError = action.payload
    },
})