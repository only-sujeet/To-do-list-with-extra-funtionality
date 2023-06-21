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

<<<<<<< HEAD
export const submitDoc = async (id,value) => {
    try {
        
        const { data } = await axios.post(`http://localhost:5000/api/emp/submitDoc/${id}`, value)
=======
export const submitDoc = async (id,valuse) => { 
    try {
        
        const { data } = await axios.post(`/api/emp/submitDoc/${id}`, valuse)
>>>>>>> 320355d7a7c92684efd01d855fbccc5fc2825998
        return data
    } catch (error) {
        if (error.response) {

            return error.response.data
        }
    }
}

