import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import {
	getCandidateDetail,
	applyToAttempt,
	cancelRequest,
	getApplications,
	categorizeAttemptRequests,
} from "../actions/candidate.actions"

const initialState = {
	loading: false,
	details: {},
	upcomingAssessments: [],
	attemptedAssessments: [],
	appliedAssessments: [],

	error: {
		message: "",
	},
}

const candidateSlice = createSlice({
	name: "candidate slice",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getCandidateDetail.pending, (state) => {
				state.loading = true
			})
			.addCase(getCandidateDetail.fulfilled, (state, action) => {
				state.details = JSON.parse(action.payload)
				state.loading = false
			})
			.addCase(getCandidateDetail.rejected, (state, action) => {
				toast.error(action.payload?.message)
				state.error.message = action.payload?.message
			})

			.addCase(applyToAttempt.pending, (state) => {
				state.loading = true
			})
			.addCase(applyToAttempt.fulfilled, (state, action) => {
				const {msg, assessmentId} = JSON.parse(action.payload)
				const date = new Date()
				state.appliedAssessments = [
					...state.appliedAssessments,
					{
						assessmentId,
						shortlisted: false,
						attempted: false,
						updatedAt: date.getTime(),
					},
				]
				toast.success(msg)
				state.loading = false
			})
			.addCase(applyToAttempt.rejected, (state, action) => {
				state.loading = false
				toast.error(action.payload.message)
			})

			.addCase(cancelRequest.pending, (state) => {
				state.loading = true
			})
			.addCase(cancelRequest.fulfilled, (state, action) => {
				const {msg, assessmentId} = JSON.parse(action.payload)
				state.appliedAssessments = state.appliedAssessments.filter(
					(obj) => obj.assessmentId !== assessmentId
				)
				toast.success(msg)
				state.loading = false
			})
			.addCase(cancelRequest.rejected, (state, action) => {
				state.loading = false
				toast.error(action.payload?.message)
			})

			.addCase(getApplications.pending, (state) => {
				state.loading = true
			})
			.addCase(getApplications.fulfilled, (state, action) => {
				// toast.success(JSON.parse(action.payload))
				const {appliedAssessments, upcomingAssessments, attemptedAssessments} =
					categorizeAttemptRequests(JSON.parse(action.payload))
				state.appliedAssessments = appliedAssessments
				state.upcomingAssessments = upcomingAssessments
				state.attemptedAssessments = attemptedAssessments
				state.loading = false
			})
			.addCase(getApplications.rejected, (state, action) => {
				state.loading = false
				toast.error(action.payload)
			})
	},
})

export default candidateSlice.reducer
