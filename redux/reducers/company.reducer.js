import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import {
	getAssessmentRequests,
	clearCompanyData,
	getActiveAssessments,
	getCompanyDetail,
	getCurrentAssessmentDetails,
	getDisabledAssessments,
	getEditAssessmentDetails,
	respondRequest,
	postNewAssessment,
	editAssessment,
	deleteAssessment,
} from "../actions/company.actions"

const initialState = {
	loading: false,
	details: {},
	activeAssessments: [],
	disabledAssessments: [],
	currentAssessment: {requested: [], shortlisted: [], attempted: []},
	editAssessmentDetails: {},
	error: {
		message: "",
	},
}

const companySlice = createSlice({
	name: "company",
	initialState,
	reducers: {
		clearStoreCompanyData: () => initialState,
	},
	extraReducers(builder) {
		builder
			.addCase(getCompanyDetail.pending, (state) => {
				state.loading = true
			})
			.addCase(getCompanyDetail.fulfilled, (state, action) => {
				state.details = {
					...action.payload.data,
				}
				state.loading = false
			})
			.addCase(getCompanyDetail.rejected, (state, action) => {
				toast.error(action.payload)
				state.error.message = action.payload
			})
			.addCase(getActiveAssessments.pending, (state) => {
				state.loading = true
			})
			.addCase(getActiveAssessments.fulfilled, (state, action) => {
				state.activeAssessments = action.payload.data
				state.loading = false
			})
			.addCase(getActiveAssessments.rejected, (state, action) => {
				toast.error(action.payload)
				state.error.message = action.payload
			})
			.addCase(getDisabledAssessments.pending, (state) => {
				state.loading = true
			})
			.addCase(getDisabledAssessments.fulfilled, (state, action) => {
				state.disabledAssessments = action.payload.data
				state.loading = false
			})
			.addCase(getDisabledAssessments.rejected, (state, action) => {
				toast.error(action.payload)
				state.error.message = action.payload
			})
			.addCase(getCurrentAssessmentDetails.pending, (state) => {
				state.loading = true
			})
			.addCase(getCurrentAssessmentDetails.fulfilled, (state, action) => {
				state.currentAssessment = action.payload.data

				state.loading = false
			})
			.addCase(getCurrentAssessmentDetails.rejected, (state, action) => {
				toast.error(action.payload)
				state.error.message = action.payload
			})
			.addCase(getAssessmentRequests.pending, (state) => {
				state.loading = true
			})
			.addCase(getAssessmentRequests.fulfilled, (state, action) => {
				const {requested, shortlisted, attempted} = JSON.parse(action.payload)

				state.currentAssessment = {
					...state.currentAssessment,
					requested,
					shortlisted,
					attempted,
				}
				state.loading = false
			})
			.addCase(getAssessmentRequests.rejected, (state, action) => {
				toast.error(action.payload)
				state.error.message = action.payload
			})

			.addCase(getEditAssessmentDetails.pending, (state) => {
				state.loading = true
			})
			.addCase(getEditAssessmentDetails.fulfilled, (state, action) => {
				state.editAssessmentDetails = action.payload.data
				state.loading = false
			})
			.addCase(getEditAssessmentDetails.rejected, (state, action) => {
				toast.error(action.payload)
				state.error.message = action.payload
				state.loading = false
			})

			.addCase(respondRequest.pending, (state) => {
				// state.loading = true
			})
			.addCase(respondRequest.fulfilled, (state, action) => {
				const {msg, requestId, candidateId, response} = action.payload
				let {requested, shortlisted} = state.currentAssessment
				if (response) {
					state.currentAssessment = {
						...state.currentAssessment,
						requested: requested.filter((i) => i._id !== requestId),
						shortlisted: [
							...shortlisted,
							{
								candidateId,
								_id: requestId,
								shortlisted: true,
								attempted: false,
							},
						],
					}
				} else {
					// if not shortlisted need to send notification to candidate
					state.currentAssessment = {
						...state.currentAssessment,
						requested: requested.filter((i) => i._id !== requestId),
					}
				}
				toast.success(msg)
				// state.loading = false
			})
			.addCase(respondRequest.rejected, (state, action) => {
				toast.error(action.payload)
				state.error.message = action.payload
				// state.loading = false
			})

			// Create, Delete, Update
			.addCase(postNewAssessment.fulfilled, (state, action) => {
				toast.success(
					action.payload.data?.message
						? action.payload.data?.message
						: "new assessment is created"
				)
			})
			.addCase(postNewAssessment.rejected, (state, action) => {
				toast.error("error in creating assessment")
			})
			.addCase(editAssessment.fulfilled, (state, action) => {
				toast.success(
					action.payload.data?.message
						? action.payload.data?.message
						: "assessment is updated successfully"
				)
			})
			.addCase(editAssessment.rejected, (state, action) => {
				toast.error("error in updating assessment")
			})
			.addCase(deleteAssessment.fulfilled, (state, action) => {
				toast.success(
					action.payload.data?.message
						? action.payload.data?.message
						: "assessment is deleted successfully"
				)
			})
			.addCase(deleteAssessment.rejected, (state, action) => {
				toast.error("error in deleting assessment")
			})
	},
})

export const { clearStoreCompanyData } = companySlice.actions
export default companySlice.reducer
