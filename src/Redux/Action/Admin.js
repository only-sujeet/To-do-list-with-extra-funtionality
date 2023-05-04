import axios from "axios"


export const getCompany = (values) => async (dispatch) => {
    try {
        dispatch({
            type: "getCompanyRequest"
        })
        const { data } = await axios.post('http://localhost:5000/api/admin/getCompany')

        dispatch({
            type: "getCompanySuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "getCompanyFailuer"
        })
    }
}
export const getPeople = () => async (dispatch) => {
    try {
        dispatch({
            type: "getPeopleRequest"
        })
        const { data } = await axios.get('http://localhost:5000/api/admin/getPeople')

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

