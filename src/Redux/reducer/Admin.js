import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const adminReducer = createReducer(initialState, {
    // For Company
    getCompanyRequest: (state,) => {
        state.loading = true;
    },
    getCompanySuccess: (state, action) => {
        state.loading = false;
        state.company = action.payload
    },
    getCompanyFailuer: (state, action) => {
        state.loading = true;
        state.getCompanyError = action.payload
    },
    // for People
    getPeopleRequest: (state,) => {
        state.loading = true;
    },
    getPeopleSuccess: (state, action) => {
        state.loading = false;
        state.people = action.payload
    },
    getPeopleFailuer: (state, action) => {
        state.loading = true;
        state.getPeopleError = action.payload
    },
    // for Block People
    getBlkPeopleRequest: (state,) => {
        state.loading = true;
    },
    getBlkPeopleSuccess: (state, action) => {
        state.loading = false;
        state.blkpeople = action.payload
    },
    getBlkPeopleFailuer: (state, action) => {
        state.loading = true;
        state.getblkPeopleError = action.payload
    },

    // for task

    getTaskRequest: (state,) => {
        state.loading = true;
    },
    getTaskSuccess: (state, action) => {
        state.loading = false;
        state.task = action.payload
    },
    getTaskFailuer: (state, action) => {
        state.loading = true;
        state.taskerror = action.payload
    },

    adminProfileRequest: (state,) => {
        state.loading = true;
    },
    adminProfileSuccess: (state, action) => {
        state.loading = false;
        state.dept = action.payload
    },
    adminProfileFailuer: (state, action) => {
        state.loading = true;
        state.taskerror = action.payload
    },
    
    
})