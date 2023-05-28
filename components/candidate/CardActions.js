// CSS-STYLES
import { useState } from "react"
import { text3 } from "./AssessmentCard"
// END OF CSS-STYLES
import {
	applyToAttempt,
	cancelRequest,
} from "../../redux/actions/candidate.actions"
import {CalenderIcon, TickIcon, CheckMarkIcon} from "./icons"
import {useDispatch} from "react-redux"

export const ActionSection = ({status, info, intvwReq}) => {
	const [currentStatus, setCurrentStatus] = useState(status)
	const dispatch = useDispatch()
	return (
		<div className="h-[15%] flex items-center py-4">
			{currentStatus === "apply" && (
				<Apply
					info={info}
					dispatch={dispatch}
					setCurrentStatus={setCurrentStatus}
				/>
			)}
			{currentStatus === "applied" && (
				<Applied
					info={info}
					dispatch={dispatch}
					setCurrentStatus={setCurrentStatus}
					intvwReq={intvwReq}
				/>
			)}
			{currentStatus === "upcoming" && <Scheduled intvwReq={intvwReq} />}
			{currentStatus === "attempted" && <Attempted intvwReq={intvwReq} />}
		</div>
	)
}

const Apply = ({info, dispatch, setCurrentStatus}) => {
	const {assessmentId, candidateId} = info
	const [loading, setLoading] = useState(false)

	const handleApply = () => {
		setLoading(true)
		dispatch(applyToAttempt({assessmentId, candidateId})).then((res) => {
			setLoading(false)
			setCurrentStatus("applied")
		})
	}
	return (
		<button
			className={` bg-color1 px-[.75em] py-[.35em] ${text3}  font-semibold`}
			onClick={handleApply}
			disabled={loading}
		>
			Apply
		</button>
	)
}

export const Applied = ({info, dispatch, intvwReq, setCurrentStatus}) => {
	let date = new Date(intvwReq.updatedAt)
	const timestamp = date.toLocaleDateString() + " " + date.toLocaleTimeString()
	const {assessmentId, candidateId} = info
	const [loading, setLoading] = useState(false)
	const handleCancel = () => {
		setLoading(true)
		dispatch(cancelRequest({assessmentId, candidateId})).then((res) => {
			setLoading(false)
			setCurrentStatus("apply")
		})
	}
	return (
		<div
			className={`${text3} font-medium flex gap-2 items-center px-[.5em] py-[.35em] rounded`}
		>
			<CheckMarkIcon />
			<p className="m-0 text-gray-600">You Applied on</p>
			<p className="m-0">{timestamp}</p>
			<button
				className={`px-[.75em] py-[.35em] ${text3} font-semibold border-2 border-color1-dark`}
				onClick={handleCancel}
				disabled={loading}
			>
				cancel
			</button>
		</div>
	)
}

export const Attempted = ({ intvwReq }) => {
  const result = 90
  const date = new Date(intvwReq.updatedAt)
  const timestamp =
    date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes()
  return (
    <div className={` ${text3} flex gap-4 lg:gap-2`}>
      <div className="flex gap-2 items-center px-[.5em] py-[.35em] border-2 border-success-ls rounded">
        <TickIcon />
        <p className="m-0  text-success">Attempted</p>
        <p className="m-0 truncate">{ timestamp}</p>
      </div>
      <p className="m-0 px-[.5em] py-[.35em] border-2 border-success rounded">
        <span className="md:hidden">Scored</span> <b>{result}%</b>
      </p>
    </div>
  )
}

export const Scheduled = ({ intvwReq }) => {
  const date = new Date(intvwReq.updatedAt)
  const timestamp =
    date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes()
  return (
    <div
      className={`${text3} flex gap-2 items-center px-[.5em] py-[.35em] border-2 border-warning-ls rounded`}
    >
      <CalenderIcon />
      <p className="m-0 text-warning">Scheduled</p>
      <p className="m-0">{ timestamp}</p>
    </div>
  )
}
