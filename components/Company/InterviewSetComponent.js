import React, { useEffect, useState } from "react";
import { interviewSetStatusTabs } from "../../data";
import useWindowDimensions from "../../hooks/useWindowDimensions ";
import InterviewSetDetailCard from "./InterviewSetDetailCard";
import { Space, Table, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {respondRequest} from "../../redux/actions/company.actions"
import {useRouter} from "next/router"

const InterviewSetComponent = ({getDetails}) => {
	const router = useRouter()
	const currentAssessment = useSelector(
		(state) => state?.companyReducer?.currentAssessment
	)
	const dispatch = useDispatch()
	const {attempted, shortlisted, requested, rejected} = currentAssessment
	const [activeTab, setActiveTab] = useState(interviewSetStatusTabs[0].id)
	const {height, width} = useWindowDimensions()
	const activeClass = `text-black font-semibold border-b-4 border-b-color2`

	const [dataSource, setDataSource] = useState([])
	const [columns, setColumns] = useState([])
	function handleActiveTabData() {
		if (activeTab === "request") {
			setDataSource(
				requested?.map((i, index) => ({
					key: index,
					name: i.candidateId.name,
					phone: i.candidateId.phone,
					email: i.candidateId.email,
					request: i,
				}))
			)
			setColumns(columnType1)
		} else if (activeTab === "schedule") {
			setDataSource(
				shortlisted?.map((i, index) => ({
					key: index,
					name: i.candidateId.name,
					phone: i.candidateId.phone,
					email: i.candidateId.email,
					status: (
						<div className="text-warning mr-2 font-bold w-max">
							Scheduled on {" : " + new Date().toLocaleDateString()}
						</div>
					),
				}))
			)

			setColumns(columnType2)
		} else if (activeTab === "attempt") {
			setDataSource(
				attempted?.map((i, index) => ({
					key: index,
					name: i.candidateId.name,
					phone: i.candidateId.phone,
					email: i.candidateId.email,
					status: (
						<div className="text-success mr-2 font-bold w-max">
							Attempted on {" : " + new Date(i.updatedAt).toLocaleDateString()}
						</div>
					),
				}))
			)
			setColumns(columnType2)
		} else if (activeTab === "decline") {
			setDataSource(
				rejected?.map((i, index) => ({
					key: index,
					name: i.candidateId.name,
					phone: i.candidateId.phone,
					email: i.candidateId.email,
					status: (
						<div className="text-error mr-2 font-bold w-max">
							Declined on {" : " + new Date(i.updatedAt).toLocaleDateString()}
						</div>
					),
				}))
			)
			setColumns(columnType2)
		} else {
			setDataSource([])
			setColumns([])
		}
	}

	const columnType1 = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (_, {request}) => {
				return (
					<div className="w-full grid grid-cols-2">
						<button
							onClick={() => {
								dispatch(
									respondRequest({
										candidateId: request.candidateId,
										requestId: request._id,
										response: true,
									})
								)
								getDetails()
							}}
							className="border-2 text-success mr-2 font-bold"
						>
							Accept
						</button>
						<button
							onClick={() => {
								dispatch(
									respondRequest({
										candidateId: request.candidateId,
										requestId: request._id,
										response: false,
									})
								)
								getDetails()
							}}
							className="border-2 text-error ml-2 font-bold"
						>
							Decline
						</button>
					</div>
				)
			},
		},
	]

	const columnType2 = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},
	]
	useEffect(() => {
		handleActiveTabData()
	}, [activeTab, attempted, shortlisted, requested, rejected])

	return (
		<div className="w-full h-full flex flex-col justify-start items-center mt-32 md:px-2 px-32 ">
			<div className="w-full flex justify-start items-center md:px-4">
				<span className="description">
					<span
						onClick={() => router.push("/company")}
						className="cursor-pointer"
					>
						Assessments
					</span>
					<span className="text-black font-semibold">
						{" "}
						/ {currentAssessment?.assessment?.title}
					</span>
				</span>
			</div>
			<InterviewSetDetailCard data={currentAssessment?.assessment} />
			<div className="w-full md:px-2 px-8 flex mt-4">
				{interviewSetStatusTabs.map((tab, index) => (
					<span
						key={index}
						onClick={() => setActiveTab(tab.id)}
						className={`${
							tab.id == activeTab && activeClass
						} cursor-pointer md:text-xs md:px-0 px-4 py-2 mx-4 flex justify-center items-center`}
					>
						<div className={`text-${tab.textColor}`}>{tab.title}</div>
						<div
							className={`rounded-full md:w-[16px] md:h-[16px] w-[24px] h-[24px] flex justify-center md:text-xs items-center ml-4 text-black bg-${tab.fillColor}`}
						>
							{tab.id === "request" && requested?.length}
							{tab.id === "schedule" && shortlisted?.length}
							{tab.id === "attempt" && attempted?.length}
							{tab.id === "decline" && attempted?.length}
						</div>
					</span>
				))}
			</div>
			<div className="w-full mt-4">
				<Table dataSource={dataSource} columns={columns} />;
			</div>
		</div>
	)
}

export default InterviewSetComponent;
