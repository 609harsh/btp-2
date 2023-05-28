import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./reducers/auth.reducer"
import companySlice from "./reducers/company.reducer"
import candidateSlice from "./reducers/candidate.reducer"
export default configureStore({
  reducer: {
    authReducer: authSlice,
    companyReducer: companySlice,
    candidateReducer: candidateSlice,
  },

  devTools: process.env.NEXT_PUBLIC_DEVTOOL
    ? process.env.NEXT_PUBLIC_DEVTOOL
    : false,
})
