import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const adminReducer = createReducer(initialState, {
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
    }

})