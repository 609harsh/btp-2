import { Input, Switch, TimePicker } from "antd";
import React, { useState } from "react";
import { Picture } from "../../assets/icons";
import { CustomInputGroup, CustomTextAreaGroup } from "../form/CustomInput";
import moment from "moment";
import { useRouter } from "next/router";
import { postNewAssessment } from "../../redux/actions/company.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"

const CreateInterviewSet = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const organizationId = useSelector(
		(state) => state?.companyReducer?.details?.organizationId
	)
	const [domain, setDomain] = useState("")
	const [skills, setSkills] = useState("")
	const [description, setDescription] = useState("")
	const [file, setFile] = useState()
	const [fileAsBase64, setFileAsBase64] = useState("")
	const [duration, setDuration] = useState("00:00:00")
	const [disabled, setDisabled] = useState(false)
	const [isPredefined, setIsPredefined] = useState(false)

	const onToggleChange = (checked) => {
		setIsPredefined(checked)
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

	const handleOnChange = (e) => {
		setFile(e.target.files[0])
	}

	const onChange = (time, timeString) => {
		setDuration(timeString)
	}

	const onDisableChange = (checked) => {
		setDisabled(checked)
	}

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
			if (file === undefined) {
				return toast.error("Please Upload File")
			}
			let reader = new FileReader()
			reader.readAsText(file)
			reader.onload = async function () {
				let fileData = reader.result
				let newAssessmentObj = {
					organizationId: organizationId,
					title: domain,
					description: description,
					time: duration,
					skills: skills.split(","),
					fileData: fileData,
					file: fileAsBase64,
				}
				dispatch(postNewAssessment(newAssessmentObj)).then((res) => {
					router.push("/company")
				})
			}
		} else {
			let newAssessmentObj = {
				organizationId: organizationId,
				title: domain,
				description: description,
				time: duration,
				skills: skills.split(","),
				fileData: null,
				file: null,
			}
			dispatch(postNewAssessment(newAssessmentObj)).then((res) => {
				router.push("/company")
			})
		}
	}

	return (
		<div className="w-full h-full flex flex-col justify-start items-center mt-32 md:px-2 px-32 ">
			<div className="w-full flex justify-start items-center md:px-4">
				<span className="heading-2">Create Assessment</span>
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
				{/* <div className="mt-4">
            <span className='mr-4'>Disable The Test</span>
            <Switch onChange={onDisableChange} value={disabled} />
          </div> */}
				<div className="mt-4 w-full flex justify-end items-end mb-8">
					<button
						className="btn-secondary"
						onClick={() => router.push("/company")}
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

export default CreateInterviewSet;
