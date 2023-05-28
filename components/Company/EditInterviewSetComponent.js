import { Switch, TimePicker } from 'antd';
import React , {useState} from 'react'
import { Picture } from '../../assets/icons';
import { CustomInputGroup, CustomTextAreaGroup } from '../form/CustomInput'
import moment from 'moment';
import { useRouter } from 'next/router';
import { editAssessment } from '../../redux/actions/company.actions';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"

const EditInterviewSetComponent = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const id = router.query.id

	function dataURLtoFile(dataurl, filename) {
		if (!dataurl) return null
		var arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}

		return new File([u8arr], filename, {type: mime})
	}

	const organizationId = useSelector(
		(state) => state.companyReducer?.details?.organizationId
	)
	const editAssessmentDetails = useSelector(
		(state) => state?.companyReducer?.editAssessmentDetails
	)
	const [domain, setDomain] = useState(editAssessmentDetails?.title)
	const [skills, setSkills] = useState(editAssessmentDetails?.skills?.join())
	const [description, setDescription] = useState(
		editAssessmentDetails?.description
	)
	const [file, setFile] = useState(
		dataURLtoFile(editAssessmentDetails?.file, "file.csv")
	)
	const [fileAsBase64, setFileAsBase64] = useState(editAssessmentDetails?.file)
	const [duration, setDuration] = useState(editAssessmentDetails?.time)
	const [disabled, setDisabled] = useState(!editAssessmentDetails?.active)
	const [isPredefined, setIsPredefined] = useState(false)

	const onToggleChange = (checked) => {
		setIsPredefined(checked)
	}

	const handleOnChange = (e) => {
		setFile(e.target.files[0])
	}

	const onChange = (time, timeString) => {
		setDuration(timeString)
	}

	const onDisableChange = (checked) => {
		setDisabled(checked)
	}

	useEffect(() => {
		if (file) {
			var reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = async function () {
				let fileData = reader.result
				setFileAsBase64(fileData)
			}
		}
	}, [file])

	const submitAssessment = async () => {
		console.log(file, isPredefined)
		if (
			domain == "" ||
			skills == "" ||
			description === "" ||
			duration === "00:00:00"
		) {
			return toast.error("Please Give All Details")
		}
		if (file && file?.type !== "text/csv") {
			return toast.error("Please Update a CSV File")
		}
		if (isPredefined) {
			if (!file) {
				return toast.error("Please Upload File")
			}
			let reader = new FileReader()
			reader.readAsText(file)
			reader.onload = async function () {
				let fileData = reader.result
				let newAssessmentObj = {
					assessmentId: id,
					title: domain,
					description: description,
					time: duration,
					skills: skills.split(","),
					fileData: fileData,
					file: fileAsBase64,
					active: !disabled,
				}
				dispatch(editAssessment(newAssessmentObj)).then((res) => {
					// toast.success(res?.data?.message)
					router.push("/company")
				})
			}
		} else {
			console.log(organizationId)
			let newAssessmentObj = {
				assessmentId: id,
				title: domain,
				description: description,
				time: duration,
				skills: skills.split(","),
				active: !disabled,
			}
			dispatch(editAssessment(newAssessmentObj)).then((res) => {
				// toast.success(res?.data?.message)
				router.push("/company")
			})
		}
	}

	return (
		<div className="w-full h-full flex flex-col justify-start items-center mt-32 md:px-2 px-32 ">
			<div className="w-full flex justify-start items-center md:px-4">
				<span className="heading-2">Edit Assessment</span>
			</div>
			<div className="w-full flex flex-col items-start mt-12 md:px-4">
				<div className="mt-4 w-1/2 md:w-full">
					<CustomInputGroup
						required={true}
						labelName="Domain Name"
						placeholder="enter domain name"
						type="text"
						size="max"
						value={domain}
						setValue={setDomain}
					/>
				</div>
				<div className="mt-4 w-1/2 md:w-full">
					<CustomInputGroup
						required={true}
						labelName="Skill Set"
						placeholder="ex: java, python, c++, ml, html"
						type="text"
						size="max"
						value={skills}
						setValue={setSkills}
					/>
				</div>
				<div className="mt-4 w-1/2 md:w-full">
					<CustomTextAreaGroup
						required={true}
						labelName="description"
						placeholder="enter value"
						size="max"
						value={description}
						setValue={setDescription}
					/>
				</div>
				<div className="mt-4 w-1/2 flex items-center justify-between ">
					<span className="text-lg mt-4">Want to upload custom questions?</span>
					<Switch value={isPredefined} onChange={onToggleChange} />
				</div>
				<div className="mt-8 flex w-1/2">
					{isPredefined && (
						<>
							<div className="flex">
								<label For="file-upload" class="btn-secondary">
									<span className="">Upload Q/A Scripts</span>
								</label>
								<input
									id="file-upload"
									type="file"
									accept={".csv"}
									onChange={handleOnChange}
								/>
							</div>
							{file && (
								<div className="px-4 py-2 border rounded-lg border-error ml-4 flex">
									<Picture />
									<span className="ml-4">{file.name}</span>
								</div>
							)}
						</>
					)}
				</div>
				<div className="mt-4">
					<span className="mr-4">Duration Of The Test</span>
					<TimePicker
						allowClear={false}
						value={moment(duration, "HH:mm:ss")}
						onChange={onChange}
						defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
						showNow={false}
					/>
				</div>
				<div className="mt-4">
					<span className="mr-4">Disable The Test</span>
					<Switch onChange={onDisableChange} checked={disabled} />
				</div>
				<div className="mt-4 w-full flex justify-end items-end mb-8">
					<button
						className="btn-secondary"
						onClick={() => router.push("/company/interviewSet/" + id)}
					>
						Back
					</button>
					<button className="btn-primary ml-4" onClick={submitAssessment}>
						Save
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	)
}

export default EditInterviewSetComponent