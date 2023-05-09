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
    field: yup.string().required("Please Enter Department")
})

export const addSubDept = yup.object({
    company: yup.string().required("Please Select Company"),
    field: yup.string().required("Please Select Department"),
    subField : yup.string().required("Please Enter Sub-Department"),
})
export const addprofile = yup.object({
    field: yup.string().required("Please Select Department"),
    subField: yup.string().required("Please Select Sub-Department"),
    position: yup.string().required("Please Enter Position"),
    firstName: yup.string().required("Please Enter Your First Name").min(5),
    middleName: yup.string().required("Please Enter Your Middle Name").min(5),
    lastName: yup.string().required("Please Enter Your Last Name").min(5),
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    dob: yup.date().required("Please Select Date of Birth"),
    age:yup.number().required("Please Enter Age"),
    mobileno:yup.number().min(1000000000,['Mobile No is not valid']).max(9999999999,['Mobile Nois not valid']).required("Please Enter Mobile No."),
    altmobileno:yup.number().min(1000000000,['Alternate Mobile No. is not valid']).max(9999999999,['Alternate Mobile No. is not valid']).required("Please Enter Alternate Mobile No."),
    address1:yup.string().required("Please Enter Address"),
    address2:yup.string().required("Please Enter Alternate Address"),

})
export const addTask = yup.object({
    name: yup.string().required("Please Enter Task Name"),
    description: yup.string().required("Please Enter Description"),
    field:  yup.string().required("Please Select Department"),
    agency: yup.string().required("Please Select Company"),
    taskDependency:yup.string().required("Please Enter Task Dependency"),
    QTY: yup.number().required("Please Enter Quantity"),
    amount:yup.number().required("Please Enter Ammount"),

})