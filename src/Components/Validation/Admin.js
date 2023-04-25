import *   as  yup from 'yup'

export const login = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    password: yup.string().min(6).required("Please Enter Your Password")
})