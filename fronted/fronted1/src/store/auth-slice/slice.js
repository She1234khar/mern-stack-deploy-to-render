import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
  isAuthenticated :false,
  isLoading :true,
  user :null
}
export const registerUser = createAsyncThunk('/auth/register',
  async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
      withCredentials: true
    })
    return response.data;

  }
)

export const loginUser = createAsyncThunk('/auth/login',
  async (formData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData, {
      withCredentials: true
    })
    return response.data;

  }
)

export const logoutUser = createAsyncThunk('/auth/logout',
  async () => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
      withCredentials: true
    })
    return response.data;

  }
)

export const checkAuthStatus = createAsyncThunk('/auth/check',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
      withCredentials: true
    })
    return response.data;

  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated=action.payload.success ? true :false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated=action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
  }
})

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;