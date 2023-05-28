import { useRouter } from 'next/router';
import React from 'react'
import { Calendar, Clock, Question } from '../../assets/icons'

const IntervieweSetCard = ({
  title, description, time,  questions, requests, scheduled, attempted, createdAt,  updatedAt, assessmentId
}) => {

  const router = useRouter();
  let customCreatedAt = new Date(createdAt).toDateString();
  let customUpdatedAt = new Date(updatedAt).toDateString();

  const RequestBadge = () => {
    return(
      <div className="cursor-pointer md:w-full px-2 py-1 flex justify-center items-center border-color1-tint border rounded text-xs text-color1-dark">
        <div>Request</div>
        <div className="rounded-full w-[20px] h-[20px] text-xs flex justify-center items-center ml-4 text-black bg-color1-tint">
          {requests}
        </div>
      </div>
    )
  }
  const ScheduleBadge = () => {
    return(
      <div className="cursor-pointer md:w-full md:mt-2 md:ml-0 ml-2 px-2 py-1 flex justify-center items-center border-[#FFEDDD] border rounded text-xs text-[#D36500]">
        <div>Scheduled</div>
        <div className="rounded-full w-[20px] h-[20px] text-xs flex justify-center items-center ml-4 text-black bg-[#FFEDDD]">
          {scheduled}
        </div>
      </div>
    )
  }
  const AttemptBadge = () => {
    return(
      <div className="cursor-pointer md:w-full md:mt-2 md:ml-0 ml-2 px-2 py-1 flex justify-center items-center border-[#DDFFE1] border rounded text-xs text-success">
        <div>Attempted</div>
        <div className="rounded-full w-[20px] h-[20px] text-xs flex justify-center items-center ml-4 text-black bg-[#DDFFE1]">
          {attempted}
        </div>
      </div>
    )
  }
  
  


  return (
    <div onClick={() => router.push('/company/interviewSet/' + assessmentId)} className="cursor-pointer my-4 mx-4 flex flex-col justify-start items-start border-t-8 border-t-color1 pt-8 shadow-2xl drop-shadow-2xl rounded-lg">
      <span className="sub-heading px-8">{title}</span>
      <span className="sub-description mt-4 px-8">{description}</span>
      <div className="w-full flex justify-start mt-4 px-8">
        <div className="flex justify-start items-center">
          <Clock/>
          <div className="ml-4">{time}</div>
        </div>
        <div className="flex justify-start items-center ml-8">
          <Question/>
          <div className="ml-4">{questions.length} questions</div>
        </div>
      </div>
      <div className="w-full flex md:flex-col justify-start mt-4 items-start px-8">
        <RequestBadge/>
        <ScheduleBadge/>
        <AttemptBadge/>
      </div>
      <div className="w-full flex flex-col justify-start mt-8 bg-[#EBEBEB] p-4 px-8 rounded-b-lg">
        <div className="w-full flex justify-start items-center">
          <Calendar size={16}/>
          <div className="ml-4 md:text-sm">Created At : {customCreatedAt}</div>          
        </div>
        <div className="w-full flex justify-start items-center mt-2">
          <Calendar size={16}/>
          <div className="ml-4 md:text-sm">Modified At : {customUpdatedAt}</div>          
        </div>
      </div>
    </div>
  )
}

export default IntervieweSetCard