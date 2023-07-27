import axios from "axios"
import cookie from "js-cookie"
const EmpToken = cookie.get('EmpToken')

export const Elogin = async (values) => {
    try {
        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/admin/elogin`, values)
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}


export const submitDoc = async (id, valuse) => {
    try {

        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/emp/submitDoc/${id}`, valuse, {
            headers: {
                EmpToken,
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


export const rejectTask = async (id, valuse) => {
    try {

        const { data } = await axios.post(`https://ink-q1i6.onrender.com/api/emp/rejectTask/${id}`, valuse, {
            headers: {
                EmpToken,
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