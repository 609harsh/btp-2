import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import {
  saveNewUser,
  loginWithEmailPassword,
  logout,
  setUserAuth,
} from "../actions/auth.actions"

const initialState = {
  currentUser: {},
  authenticated: false,
  loading: false,
  signupLoading:false,
  signinLoading:false,
  error: {
    message: "",
  },
}

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCurrentUser: setUserAuth,
    logoutUser: logout,
  },
  extraReducers(builder) {
    builder
      .addCase(loginWithEmailPassword.pending, (state) => {
        state.loading = true
        state.signinLoading = true
      })
      .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
        setUserAuth(state, action)
        state.loading = false
        state.signinLoading = false

      })
      .addCase(loginWithEmailPassword.rejected, (state, action) => {
        toast.error(action.payload)
        state.error.message = action.payload
        state.signinLoading = false

      })

      .addCase(saveNewUser.pending, (state) => {
        state.signupLoading = true
        state.loading = true
      })
      .addCase(saveNewUser.fulfilled, (state, action) => {
        state.signupLoading = false
        setUserAuth(state, action)
        state.loading = false
        toast.success("account created successfully")
      })
      .addCase(saveNewUser.rejected, (state, action) => {
         state.signupLoading = false
        toast.error(action.payload || "error occured in backend")
        state.error.message = action.payload
      })
  },
})

export const { setCurrentUser, logoutUser } = authSlice.actions
export default authSlice.reducer
