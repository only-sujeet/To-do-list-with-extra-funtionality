import axios from "axios"


export const adminLog = (values) => async (dispatch) => {
    try {
        dispatch({
            type: "adminLoginRequest"
        })
        const { data } = await axios.post('http://localhost:5000/api/admin/login', values)

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
        const { data } = await axios.get('api/admin/myProfile')

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
        const routeWithKey = `api/admin/getPeople?keyword=${keyword}`
        const routeWithoutKey = `api/admin/getPeople`
        const { data } = await axios.get(keyword ? routeWithKey : routeWithoutKey)

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
        const { data } = await axios.get('http://localhost:5000/api/admin/getBlockPeople')

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
        const { data } = await axios.get('/api/admin/getTask')

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
        const { data } = await axios.get('/api/emp/getAllTask')

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

