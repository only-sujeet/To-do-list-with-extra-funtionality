import {configureStore} from '@reduxjs/toolkit'
import { adminReducer } from './reducer/Admin'
import { EmpReducer } from './reducer/Employee'

const store = configureStore({
    reducer:{ 
       admin: adminReducer,
       emp: EmpReducer
    }
})
export default store 