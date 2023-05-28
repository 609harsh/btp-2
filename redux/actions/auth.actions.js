import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiServiceInstance } from "../apiUtils"

const saveNewUser = createAsyncThunk("saveNewUser",async (saveNewUserObject, { rejectWithValue }) => {
    try {
      const res = await apiServiceInstance.post("/api/register",saveNewUserObject)
      console.log("err");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const loginWithEmailPassword = createAsyncThunk(
  "auth/login-user",
  async (userObject, { rejectWithValue }) => {
    try {
      const res = await apiServiceInstance.post("/api/login", userObject)
      return res
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const logout = (state) => {
  state.currentUser = {}
  state.authenticated = false
  state.status = "idle"
  localStorage.removeItem("auth")
}

const setUserAuth = (state, action) => {
  // state.currentUser = action.payload.data
  // console.log("payload", action.payload.data)
  localStorage.setItem("auth", JSON.stringify(action.payload.data))
  // state.authenticated = true
}

export { loginWithEmailPassword, saveNewUser, logout, setUserAuth }
