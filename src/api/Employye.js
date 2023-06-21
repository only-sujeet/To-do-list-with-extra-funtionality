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

export const submitDoc = async (id,value) => {
    try {
        
        const { data } = await axios.post(`http://localhost:5000/api/emp/submitDoc/${id}`, value)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

