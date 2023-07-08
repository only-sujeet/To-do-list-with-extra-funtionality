import *   as  yup from 'yup'
import { parse, isDate } from "date-fns"

export const login = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    password: yup.string().min(8, "Password is too short - should be 8 chars minimum.").required("Please Enter Your Password")
})
export const register = yup.object({
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    password: yup.string().min(8, "Password is too short - should be 8 chars minimum.").required("Please Enter Your Password").max(10, "Password is too Large - should be 10 chars maximum."),
    company: yup.string().required("Please Enter Company Name"),
})
export const addcom = yup.object({
    company: yup.string().required("Please Enter Company Name"),
})

export const adddep = yup.object({

    department: yup.string().required("Please Enter Department")
})

export const addSubDept = yup.object({

    department: yup.string().required("Please Select Department"),
    subDept: yup.string().required("Please Enter Sub-Department"),
    rate: yup.number().required("Please Enter Rate"),
    unit: yup.string().required("Please Enter Unit")
})
export const addprofile = yup.object({
    department: yup.string().required("Please Select Department"),
    subDept: yup.string().required("Please Select Sub-Department"),
    firstName: yup.string().required("Please Enter Your First Name").min(5),
    middleName: yup.string().required("Please Enter Your Middle Name").min(5),
    lastName: yup.string().required("Please Enter Your Last Name").min(5),
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Email.."),
    dob: yup.date().required("Please Select Date of Birth"),
    age: yup.number().required("Please Enter Age"),
    mobileno: yup.number().min(1000000000, ['Mobile No is not valid']).max(9999999999, ['Mobile Nois not valid']).required("Please Enter Mobile No."),
    altmobileno: yup.number().min(1000000000, ['Alternate Mobile No. is not valid']).max(9999999999, ['Alternate Mobile No. is not valid']).required("Please Enter Alternate Mobile No."),
    address1: yup.string().required("Please Enter Address"),
    address2: yup.string().notRequired("Please Enter Alternate Address"),
    adharno: yup.number().min(100000000000, ['Adhar Card No is not valid']).max(999999999999, ['Adhar Card No is not valid']).required("Please Enter Adhar Card No."),
    panno: yup.string().min(10, ['Pan No is not valid']).max(10, ['Pan No is not valid']).required("Please Enter Pan No").matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}?$/, "Please Enter Proper Pan No. "),
})


function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}

export const addTasks = yup.object({
    name: yup.string().required("Please Enter Task Name"),
    department: yup.string().required("Please Select Department"),
    instruction: yup.string().required("Please Enter Instruction"),
    // agency: yup.string().required("Please Select Company"),
    taskDependency: yup.string().required("Please Enter Task Dependency"),
    startDate: yup.date().transform(parseDateString).min(new Date(), 'Please choose future date'),
    endDate: yup.date().transform(parseDateString).min(yup.ref("startDate"), "End date has to be more than start date"),
    check: yup.array().of(yup.object().shape({
        checklist: yup.string().required("Name required"),
    }))
    // yup.date().required("Please Select Start Date").min(startdates,"sdfs").min(new Date(),'Please choose future date'),
    // endDate : yup.date().min(enddates,"Minimum date must be 2 days from Start Date").required("Please Select Ending Date") .min(yup.ref("startDate"),"End date has to be more than start date"),
    // QTY: yup.number().required("Please Enter Quantity"),
    // amount:yup.number().required("Please Enter Ammount"),

})