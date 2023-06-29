import axios from "axios"

export const GetAssignTask = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAssignedTaskRequest"
        })
        const { data } = await axios.get('/api/emp/getAssignedTask')

        dispatch({
            type: "getAssignedTaskSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getAssignedTaskFailuer",
            payload: error.response.data.message
        })
    }
}