import axios from "axios"

export const addCompany = async (values) => {
    try {
        const data = await axios.post('/api/admin/addCompany',values)
        return data
    } catch (error) {
        return error
    }
}
export const getCompany = async (values) => {
    try {
        const data = await axios.post('http://localhost:5000/api/admin/getCompany',values)
        return data
    } catch (error) {
        return error
    }
}