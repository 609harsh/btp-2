import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { companyAssessmentTabs } from '../../data'
import useWindowDimensions from '../../hooks/useWindowDimensions ';
import IntervieweSetCard from './InterviewSetCard';

const Dashboard = () => {
  const router = useRouter();
  const activeAssessments = useSelector(state => state?.companyReducer?.activeAssessments)
  const disabledAssessments = useSelector(state => state?.companyReducer?.disabledAssessments)
  const [activeTab,setActiveTab] = useState(companyAssessmentTabs[0].id);
  const { height, width } = useWindowDimensions();
  const activeClass = `text-black font-semibold border-b-4 border-b-color2`

  return (
    <div className="w-full h-full flex flex-col justify-start items-center mt-16 px-32 md:px-8">
        <div className="w-full flex justify-between items-center">
          <span className="text-bold text-3xl">Assessments</span>
          {
            width > 700 &&
              <div className="w-full px-8 flex ">
                {
                  companyAssessmentTabs.map((tab,index) => 
                  <span 
                  key={index}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${tab.id == activeTab && activeClass} cursor-pointer px-4 py-2 mx-4 flex justify-center items-center`}
                  >
                    <div>{tab.title}</div>
                    <div className="rounded-full w-[24px] h-[24px] flex justify-center items-center ml-4 text-color2 bg-color2-tint"
                    >{
                      tab.id === 'active' ? activeAssessments.length : disabledAssessments.length
                    }</div>
                    </span>)
                }
              </div>
          }
          <span className="bg-color2 rounded cursor-pointer text-white pt-1 pb-2 px-3 text-3xl" onClick={() => router.push('/company/interviewSet/create')}>+</span>
        </div>
        {
          width <= 700 &&
          <div className="w-full flex justify-center items-center mt-8">
            {
                  companyAssessmentTabs.map((tab,index) => 
                  <span 
                  key={index}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${tab.id == activeTab && activeClass} cursor-pointer px-4 py-2 mx-4 flex justify-center items-center`}
                  >
                    <div>{tab.title}</div>
                    <div className="rounded-full w-[24px] h-[24px] flex justify-center items-center ml-4 text-color2 bg-color2-tint"
                    >{
                      tab.id === 'active' ? activeAssessments.length : disabledAssessments.length
                    }</div>
                    </span>)
                }
            </div>
        }
        <div className="w-full grid grid-cols-3 mt-8 md:grid-cols-1">
          {
            activeTab === 'active' ?
            activeAssessments.map(
              ({  title , description , time , 
                  questions , requests , scheduled , 
                  attempted, createdAt , updatedAt , _id },index) => 
              <IntervieweSetCard 
                key={index} title={title} 
                description={description} 
                time={time}  questions={questions} 
                requests={requests} scheduled={scheduled} 
                attempted={attempted} createdAt={createdAt}  
                updatedAt={updatedAt} assessmentId={_id}/>) :
            disabledAssessments.map(
              ({  title , description , time , 
                  questions , requests , scheduled , 
                  attempted, createdAt , updatedAt , _id },index) => 
              <IntervieweSetCard 
                key={index} title={title} 
                description={description} time={time}  
                questions={questions} requests={requests} 
                scheduled={scheduled} attempted={attempted} 
                createdAt={createdAt}  updatedAt={updatedAt} 
                assessmentId={_id}/>)
          }
        </div>
    </div>
  )
}

export default Dashboard