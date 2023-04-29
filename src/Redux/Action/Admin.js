import axios from "axios"


export const getCompany = (values) => async(dispatch) => {
    try {
        dispatch({
            type: "getCompanyRequest"
        })
        const {data} = await axios.post('http://localhost:5000/api/admin/getCompany')

        dispatch({
            type: "getCompanySuccess",
            payload:data
        })
    } catch (error) {
        dispatch({
            type: "getCompanyFailuer"
        })
    }
}