import *   as  yup from 'yup'

export const login = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    password: yup.string().min(6).required("Please Enter Your Password")
})
export const addcom = yup.object({
    company: yup.string().required("Please Enter Company Name"),
})

export const adddep = yup.object({
    company: yup.string().required("Please Select Company"),
    field: yup.string().required("Please Enter Field")
})

export const addprofile = yup.object({
    company: yup.string().required("Please Select Company"),
    field: yup.string().required("Please Select Field"),
    firstName: yup.string().required("Please Enter Your First Name").min(5),
    middleName: yup.string().required("Please Enter Your Middle Name").min(5),
    lastName: yup.string().required("Please Enter Your Last Name").min(5),
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    dob: yup.date().required("Please Select Date of Birth"),
    age:yup.number().required("Please Enter Age"),
    mobileno:yup.number().required("Please Enter Mobile No."),
    altmobileno:yup.number().required("Please Enter Alternate Mobile No."),
    address1:yup.string().required("Please Enter Address"),
    address2:yup.string().required("Please Enter Alternate Address"),

})