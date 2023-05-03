import axios from "axios"

const url = "http://localhost:5000/api/admin"

export const adminLogin = async (values) => {
    try {
        const data = await axios.post(`${url}/login`, values)
        return data
    } catch (error) {
        return error
    }
}
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
        const data = await axios.post('http://localhost:5000/api/admin/getDept', { company: values })
        return data
    } catch (error) {
        return error
    }
}
export const addPeople = async (values) => {
    try {
        const data = await axios.post(`${url}/addPeople`, values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    } catch (error) {
        return error
    }
}

export const deletePeople = async (id) => {
    try {
        await axios.delete(`${url}/deletePeople/${id}`)

    } catch (error) {
        return error
    }
}
export const blockPeople = async (id) => {
    try {
        await axios.post(`${url}/blockPeople/${id}`)

    } catch (error) {
        return error
    }
}