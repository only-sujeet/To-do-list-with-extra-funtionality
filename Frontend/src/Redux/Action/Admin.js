import axios from "axios"
import cookie from "js-cookie"
const Token = cookie.get('Token')

export const adminLog = (values) => async (dispatch) => {
    try {
        dispatch({
            type: "adminLoginRequest"
        })
        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/login', values, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "adminLoginSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "adminLoginFailuer",
            payload: error.response.data.message
        })
    }
}

export const getAdminProfile = (values) => async (dispatch) => {
    try {
        dispatch({
            type: "adminProfileRequest"
        })
        const { data } = await axios.get('https://ink-q1i6.onrender.com/api/admin/myProfile', {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "adminProfileSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "adminProfileFailuer"
        })
    }
}




export const getPeople = (keyword) => async (dispatch) => {
    try {
        dispatch({
            type: "getPeopleRequest"
        })
        const routeWithKey = `https://ink-q1i6.onrender.com/api/admin/getPeople?keyword=${keyword}`
        const routeWithoutKey = `https://ink-q1i6.onrender.com/api/admin/getPeople`
        const { data } = await axios.get(keyword ? routeWithKey : routeWithoutKey, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "getPeopleSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getPeopleFailuer"
        })
    }
}

export const getBlockPeople = () => async (dispatch) => {
    try {
        dispatch({
            type: "getBlkPeopleRequest"
        })
        const { data } = await axios.get('https://ink-q1i6.onrender.com/api/admin/getBlockPeople', {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "getBlkPeopleSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getBlkPeopleFailuer"
        })
    }
}
export const getTask = () => async (dispatch) => {
    try {
        dispatch({
            type: "getTaskRequest"
        })
        const { data } = await axios.get('https://ink-q1i6.onrender.com/api/admin/getTask', {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "getTaskSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getTaskFailuer"
        })
    }
}
export const getAllTask = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllTaskRequest"
        })
        const { data } = await axios.get('https://ink-q1i6.onrender.com/api/emp/getAllTask', {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "getAllTaskSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getAllTaskFailuer"
        })
    }
}
export const getRejectedTask = () => async (dispatch) => {
    try {
        dispatch({
            type: "getRejectedTaskRequest"
        })
        const { data } = await axios.get('https://ink-q1i6.onrender.com/api/admin/getRjectedTask', {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "getRejectedTaskSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getRejectedTaskFailuer"
        })
    }
}
export const getCompletedTask = () => async (dispatch) => {
    try {
        dispatch({
            type: "getCompletedTaskRequest"
        })
        const { data } = await axios.get('https://ink-q1i6.onrender.com/api/admin/getCompletedTask', {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })

        dispatch({
            type: "getCompletedTaskSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getCompletedTaskFailuer"
        })
    }
}



