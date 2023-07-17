import *   as  yup from 'yup'

export const elogin = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    password: yup.string().min(8, "Password is too short - should be 8 chars minimum.").required("Please Enter Your Password")
})

export const reject = yup.object({
    reason:yup.string().required("Please Enter Reson For Rejecting Task")
})