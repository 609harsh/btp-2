import { useRouter } from 'next/router';
import React from 'react'
import { Calendar, Clock, Delete, Edit, Question } from '../../assets/icons'
import { deleteAssessment } from '../../redux/actions/company.actions';
import {useDispatch} from "react-redux"

const InterviewSetDetailCard = ({data}) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const id = router.query.id

	let customCreatedAt = new Date(data?.createdAt).toDateString()
	let customUpdatedAt = new Date(data?.updatedAt).toDateString()

	const handleDelete = async () => {
		const confirm = window.confirm("really want to delete the assessment ?")
		if (confirm) {
			let deleteAssessmentObj = {
				assessmentId: id,
			}
			dispatch(deleteAssessment(deleteAssessmentObj)).then((res) => {
				router.push("/company")
			})
		}
	}

	return (
		<div className="my-4 w-full mx-4 grid md:grid-cols-1 grid-cols-2 border-t-8 border-t-color1 px-8 py-8 shadow-2xl drop-shadow-2xl rounded rounded-lg">
			<div className="flex flex-col justify-start items-start">
				<span className="sub-heading ">{data?.title}</span>
				<span className="sub-description mt-4">{data?.description}</span>
				<div className="w-full flex justify-start mt-4">
					<div className="flex justify-start items-center">
						<Clock />
						<div className="ml-4">{data?.time}</div>
					</div>
					<div className="flex justify-start items-center ml-8">
						<Question />
						<div className="ml-4">{data?.questions?.length} questions</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center items-end">
				<div className="flex">
					<div className="cursor-pointer" onClick={handleDelete}>
						<Delete />
					</div>

					<div
						className="cursor-pointer ml-4"
						onClick={() => router.push("/company/editInterviewSet/" + id)}
					>
						<Edit />
					</div>
				</div>
				<div className="md:w-full w-1/2 flex flex-col justify-start mt-8 bg-[#EBEBEB] p-4 px-8 rounded">
					<div className="w-full flex justify-start items-center">
						<Calendar size={24} />
						<div className="ml-4 md:text-sm">
							Created At : {customCreatedAt}
						</div>
					</div>
					<div className="w-full flex justify-start items-center mt-2">
						<Calendar size={24} />
						<div className="ml-4 md:text-sm">
							Modified At : {customUpdatedAt}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InterviewSetDetailCard