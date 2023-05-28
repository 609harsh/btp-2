import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiServiceInstance } from "../apiUtils"
import useAuth from "../../hooks/useAuth"
import { useSelector } from "react-redux"

const postNewAssessment = createAsyncThunk(
	"postNewAssessment",
	async (newAssessmentObj) => {
		const res = await apiServiceInstance.post(
			"/api/addAssessment",
			newAssessmentObj
		)
		return res
	}
)

const editAssessment = createAsyncThunk(
	"editAssessment",
	async (editAssessmentObj) => {
		const res = await apiServiceInstance.post(
			"/api/updateAssessment",
			editAssessmentObj
		)
		return res
	}
)

const deleteAssessment = createAsyncThunk(
	"deleteAssessment",
	async (deleteAssessmentObj) => {
		const res = await apiServiceInstance.get(
			"/api/deleteAssessment/" + deleteAssessmentObj?.assessmentId,
			deleteAssessmentObj
		)
		return res
	}
)

const getCompanyDetail = createAsyncThunk(
  "getCompanyDetail",
  async (getObject, { rejectWithValue }) => {
    const userId = useAuth()?.userId
    try {
      const res = await apiServiceInstance.get(
        "/api/getUserDetails/organization/" + userId
      )
      return res
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const getActiveAssessments = createAsyncThunk(
  "getActiveAssessments",
  async (getAssessObject, { rejectWithValue }) => {
    try {
      const res = await apiServiceInstance.get(
        "/api/getAssessments/" +
          getAssessObject?.organizationId +
          "?page=1&limit=100&active=true"
      )
      return res
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const getDisabledAssessments = createAsyncThunk(
  "getDisabledAssessments",
  async (getAssessObject, { rejectWithValue }) => {
    try {
      const res = await apiServiceInstance.get(
        "/api/getAssessments/" +
          getAssessObject?.organizationId +
          "?page=1&limit=100&active=false"
      )
      return res
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const getCurrentAssessmentDetails = createAsyncThunk(
  "getCurrentAssessmentDetails",
  async (getAssessObject, { rejectWithValue }) => {
    try {
      const res = await apiServiceInstance.get(
      `/api/getRequests/${getAssessObject?.assessmentId}` 
      )
      return res
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const getEditAssessmentDetails = createAsyncThunk(
  "getEditAssessmentDetails",
  async (getAssessObject, { rejectWithValue }) => {
    try {
      const res = await apiServiceInstance.get(
        "/api/getAssessmentDetail/" + getAssessObject?.assessmentId
      )
      return res
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getAssessmentRequests = createAsyncThunk(
  "getAssessmentRequests",
  async (payload, { rejectWithValue }) => {
    try {
      const { assessmentId } = payload
      const res = await apiServiceInstance.get( "/api/getAssessmentDetail/" + assessmentId)
      return JSON.stringify(res.data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const respondRequest = createAsyncThunk(
  "respondRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const { requestId, response, candidateId } = payload
      const res = await apiServiceInstance.post("/api/respondRequest/", {
        requestId,
        response,
      })
      const { msg } = res.data
      return { msg, requestId, response, candidateId }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export {
  postNewAssessment,
  getCompanyDetail,
  getActiveAssessments,
  getDisabledAssessments,
  getCurrentAssessmentDetails,
  getEditAssessmentDetails,
  editAssessment,
  deleteAssessment,
}
