import axios from "axios"


export const addCompany = async (values) => {
    try {

        const data = await axios.post('http://localhost:5000/api/admin/addCompany', values)

        return data
    } catch (error) {
        return error
    }
}

export const addDepartment = async (values) => {
    try {
        const data = await axios.post('http://localhost:5000/api/admin/addField', values)
        return data
    } catch (error) {
        return error
    }
} 

export const getField = async (values) => {
    try {
        const data = await axios.post('http://localhost:5000/api/admin/getDept',{company:values})
        return data
    } catch (error) {
        return error
    }
}

