import axios from "axios"

const url = "http://localhost:5000/api/admin"

export const adminLogin = async (values) => {
    try {
        const { data } = await axios.post(`${url}/login`, values)
        return data
        // console.log(data)
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const addCompany = async (values) => {
    try {

        const { data } = await axios.post('http://localhost:5000/api/admin/addCompany', values)

        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const deleteCompany = async (id) => {
    try {
        const { data } = await axios.delete(`${url}/deleteCompany/${id}`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const addDepartment = async (values) => {
    try {
        const { data } = await axios.post('http://localhost:5000/api/admin/addField', values)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
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
        const { data } = await axios.post(`${url}/addPeople`, values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
         return data
        // console.log(data)
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const deletePeople = async (id) => {
    try {
        const { data } = await axios.delete(`${url}/deletePeople/${id}`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const blockPeople = async (id) => {
    try {
        const { data } = await axios.post(`${url}/blockPeople/${id}`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}