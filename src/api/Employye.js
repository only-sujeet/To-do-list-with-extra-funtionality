import axios from "axios"

export const Elogin = async (values) => {
    try {
        const { data } = await axios.post(`/api/admin/elogin`, values)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

export const getAssignedTask = async () => {
    try {
        const { data } = await axios.get(`/api/emp/getAssignedTask`)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

