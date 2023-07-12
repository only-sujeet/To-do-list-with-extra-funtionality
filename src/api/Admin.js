import axios from "axios"



export const adminRegister = async (values) => {
    try {
        const { data } = await axios.post(`/api/admin/register`, values)
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

// Maname Department & Sub-Department  Api 

// Add new department 
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

// Get all Department 
export const getDept = async (values) => {
    try {
        const data = await axios.get('api/admin/getDept', { company: values })
        return data
    } catch (error) {
        return error
    }
}

// Add new sub-department 
export const addSubDepartment = async (values) => {
    try {
        const data = await axios.post('api/admin/addSubDept', values)
        return data
    } catch (error) {
        return error
    }
}

// Get all  sub-department
export const getSubDept = async (values) => {
    try {
        const { data } = await axios.post('/api/admin/getSubDept', values)
        return data
    } catch (error) {
        return error
    }
}

// Get single sub-department details 
export const getSubDeptDetails = async (valuse) => {
    try {
        const { data } = await axios.post('/api/admin/getSubDeptDetail', valuse)
        return data
    } catch (error) {
        return error
    }
}

export const getSubDeptInfo = async (valuse) => {
    try {
        const { data } = await axios.post('/api/admin/getSubDeptinfo', valuse)
        return data
    } catch (error) {
        return error
    }
}


export const editSubDept = async (valuse) => {
    try {
        const { data } = await axios.put(`/api/admin/subDept/`, valuse)
        return data
    } catch (error) {
        return error
    }
}


// Delete sub-department 
export const delSubDept = async (id, deptId) => {
    try {
        const { data } = await axios.post(`api/admin/subDept/${id}`, deptId)
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
        const { data } = await axios.delete(`/api/admin/deletePeople/${id}`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const blockPeople = async (id) => {
    try {
        const { data } = await axios.post(`/api/admin/blockPeople/${id}`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const unBlockPeople = async (id) => {
    try {
        const { data } = await axios.post(`/api/admin/unBlockPeople/${id}`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const createTask = async (values,  val, daysdata) => {
    try {

        const { data } = await axios.post('/api/admin/addTask', { values,  val, daysdata })
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
export const AssignTask = async (empId, taskId) => {
    try {

        const { data } = await axios.post('/api/admin/assignTask', { empId, taskId })
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const ApproveTask = async (id) => {
    try {

        const { data } = await axios.get(`/api/admin/approveTask/${id}`,)
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const csvUpload = async (values) => {
    try {
        const { data } = await axios.post(`/api/admin/BulkUpload`, values, {
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

