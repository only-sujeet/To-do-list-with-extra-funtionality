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


})