import axios from "axios"
import cookie from "js-cookie"
const Token = cookie.get('Token')

export const adminRegister = async (values) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/register`, values, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const adminLogin = async (values) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/login`, values, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
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
        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/addField', values, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

// Get all Department 
export const getDept = async () => {
    try {
        const data = await axios.get('https://ink-q1i6.onrender.com/api/admin/getDept',{
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}

// Add new sub-department 
export const addSubDepartment = async (values) => {
    try {
        const data = await axios.post('https://ink-q1i6.onrender.com/api/admin/addSubDept', values, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}

// Get all  sub-department
export const getSubDept = async (values) => {
    try {
        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/getSubDept', values, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}

// Get single sub-department details 
export const getSubDeptDetails = async (valuse) => {
    try {
        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/getSubDeptDetail', valuse, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}

export const getSubDeptInfo = async (valuse) => {
    try {
        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/getSubDeptinfo', valuse, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}


export const editSubDept = async (valuse) => {
    try {
        const { data } = await axios.put(`https://ink-q1i6.onrender.com/api/admin/subDept/`, valuse, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}

// Delete sub-department 
export const delSubDept = async (id, deptId) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/subDept/${id}`, deptId, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        return error
    }
}

export const addPeople = async (values) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/addPeople`, values, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Token

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
        const { data } = await axios.delete(`https://ink-q1i6.onrender.com/api/admin/deletePeople/${id}`, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const blockPeople = async (id) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/blockPeople/${id}`, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const unBlockPeople = async (id) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/unBlockPeople/${id}`, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const createTask = async (values, val, daysdata) => {
    try {

        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/addTask', { values, val, daysdata }, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const getOneTask = async (id) => {
    try {

        const { data } = await axios.get(`https://ink-q1i6.onrender.com/api/admin/getOneTask/${id}`, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const getEmpByDept = async (values) => {
    try {

        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/getEmpByDept', { department: values }, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const AssignTask = async (empId, taskId) => {
    try {

        const { data } = await axios.post('https://ink-q1i6.onrender.com/api/admin/assignTask', { empId, taskId }, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const ApproveTask = async (id) => {
    try {

        const { data } = await axios.get(`https://ink-q1i6.onrender.com/api/admin/task/${id}`, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const delTask = async (id) => {
    try {

        const { data } = await axios.delete(`https://ink-q1i6.onrender.com/api/admin/task/${id}`, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const csvUpload = async (values) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/BulkUpload`, values, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Token
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

export const setComplete = async (id) => {
    try {

        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/completeTask/${id}`, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}
export const remark = async (id, values) => {
    try {

        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/remarks/${id}`, values, {
            headers: {
                Token,
                Accept: 'application/json',
            },
        })
        return data

    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}