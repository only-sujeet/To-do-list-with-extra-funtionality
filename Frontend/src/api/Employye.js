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

export const submitDoc = async (id, valuse) => {
    try {

        const { data } = await axios.post(`/api/emp/submitDoc/${id}`, valuse)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}


export const rejectTask = async (id, valuse) => {
    try {

        const { data } = await axios.post(`/api/emp/rejectTask/${id}`, valuse)
        return data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}