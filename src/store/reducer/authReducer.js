import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async (info, { rejectWithValue, fulfillWithValue , }) => {
        console.log(info)
        try {
            const { data } = await axios.post(`${base_url}/api/customer/customer-register`, info)
            localStorage.setItem('customerToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        console.log(info)

        try {
            const { data } = await axios.post(`${base_url}/api/customer/customer-login`, info)
            localStorage.setItem('customerToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const decodeToken = (token) => {
    if (token) {
        const userInfo = jwtDecode(token)
        const expireTime = new Date(userInfo.exp * 1000)
        if (new Date() > expireTime) {
            localStorage.removeItem('customerToken')
            return ''
        } else {
            return userInfo
        }
        
    } else {
        return ''
    }
}



export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo: decodeToken(localStorage.getItem('customerToken')),
        errorMessage: '',
        successMessage: '',
        token: localStorage.getItem('customerToken')
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        user_reset: (state, _) => {
           state.userInfo = ""
        }
    },
    
    extraReducers: (builder) => {
        builder
        
          .addCase(customer_register.pending, (state) => {
            state.loader = true;
          })
          .addCase(customer_register.rejected, (state, action) => {
            state.errorMessage = action.payload.error;
            state.loader = false;
          })
          .addCase(customer_register.fulfilled, (state, action) => {
            const userInfo = decodeToken(action.payload.token);
            state.successMessage = action.payload.message;
            state.loader = false;
            state.userInfo = userInfo;
            state.token = action.payload.token
          })
      
         
          .addCase(customer_login.pending, (state) => {
            state.loader = true;
          })
          .addCase(customer_login.rejected, (state, action) => {
            state.errorMessage = action.payload.error;
            state.loader = false;
          })
          .addCase(customer_login.fulfilled, (state, action) => {
            const userInfo = decodeToken(action.payload.token);
            state.successMessage = action.payload.message;
            state.loader = false;
            state.userInfo = userInfo;
            state.token = action.payload.token
          })
        
      },
      
})

export const { messageClear,user_reset } = authReducer.actions
export default authReducer.reducer