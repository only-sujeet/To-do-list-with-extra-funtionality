import axios from "axios"

const url = "http://localhost:5000/api/admin"

export const adminRegister = async (values) => {
    try {
        const { data } = await axios.post(`${url}/register`, values)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const adminLogin = async (values) => {
    try {
        const { data } = await axios.post(`/api/admin/login`, values)
        return data
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
        const { data } = await axios.post('/api/admin/addField', values)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}



export const getDept = async (values) => {
    try {
        const data = await axios.get('api/admin/getDept', { company: values })
        return data
    } catch (error) {
        return error
    }
}



export const addSubDepartment = async (values) => {
    try {
        const data = await axios.post('api/admin/addSubDept', values)
        return data
    } catch (error) {
        return error
    }
}









export const getSubDept = async (values) => {
    try {
        const { data } = await axios.post('/api/admin/getSubDept', values)
        return data
    } catch (error) {
        return error
    }
}
export const addPeople = async (values) => {
    try {
        const { data } = await axios.post(`/api/admin/addPeople`, values, {
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
export const unBlockPeople = async (id) => {
    try {
        const { data } = await axios.post(`${url}/unBlockPeople/${id}`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const createTask = async (values, val) => {
    try {

        const { data } = await axios.post('     xc/api/admin/addTask', { values, val })
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const getEmpByDept = async (values) => {
    try {

        const { data } = await axios.post('/api/admin/getEmpByDept', { department: values })
        return data
        
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

