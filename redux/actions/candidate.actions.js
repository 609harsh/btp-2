import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiServiceInstance } from "../apiUtils"
import useAuth from "../../hooks/useAuth"

export const getCandidateDetail = createAsyncThunk(
  "getCandidateDetail",
  async (getObject, { rejectWithValue }) => {
    const userId = useAuth()?.userId
    try {
      const res = await apiServiceInstance.get(
        "/api/getUserDetails/Candidate/" + userId
      )
      return JSON.stringify(res?.data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const applyToAttempt = createAsyncThunk(
  "applyToAttempt",
  async (payload, { rejectWithValue }) => {
    try {
      const { assessmentId, candidateId } = payload
      const res = await apiServiceInstance.post("/api/attemptRequest", {
        assessmentId,
        candidateId,
      })
      return JSON.stringify({ ...res.data, assessmentId })
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const cancelRequest = createAsyncThunk(
	"cancelRequest",
	async (payload, {rejectWithValue}) => {
		try {
			const {assessmentId, candidateId} = payload
			const res = await apiServiceInstance.post("/api/cancelRequest", {
				assessmentId,
				candidateId,
			})
			return JSON.stringify({...res.data, assessmentId})
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const getApplications = createAsyncThunk(
  "getApplications",
  async (payload, { rejectWithValue }) => {
    try {
      const { candidateId } = payload
      const res = await apiServiceInstance.post("/api/getAttemptRequests", {
        candidateId,
      })
      return JSON.stringify(res.data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const categorizeAttemptRequests = (reqs) => {
  const appliedAssessments = reqs.filter((i) => !i.shortlisted && !i.attempted)
  const upcomingAssessments = reqs.filter((i) => i.shortlisted && !i.attempted)
  const attemptedAssessments = reqs.filter((i) => i.shortlisted && i.attempted)
  return { appliedAssessments, upcomingAssessments, attemptedAssessments }
}
