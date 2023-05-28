import React, { useState } from "react";
import { Clock, Question } from "../../assets/icons";
import { ActionSection } from "./CardActions";

// CSS-STYLES
const text1 = `m-0 text-4xl 2xl:text-2xl md:text-xl`;
const text2 = `m-0 text-2xl 2xl:text-xl md:text-lg`;
const text3 = `m-0 text-xl 2xl:text-sm md:text-xs`;
export { text1, text2, text3 };
// END OF CSS-STYLES
import { useSelector } from "react-redux";

export default function AssessmentCard({frwdRef, status, data}) {
	const {candidateId} = useSelector((state) => state.candidateReducer.details)

	const {_id, organizationName, title, time, description, skills, questions} =
		data

	return (
		<div
			ref={frwdRef}
			className="w-[32rem] 2xl:w-[25rem] lg:w-[22rem] md:w-[18rem] aspect-[1/.8]  
        bg-white rounded-lg py-4 px-4 border-t-[.75rem] border-color1 shadow-md
        flex flex-col gap-2 font-style1
  "
		>
			<>
				<InfoSection props={{title, description, time, questions}} />
				<ActionSection
					status={status}
					intvwReq={data}
					info={{assessmentId: _id, candidateId}}
				/>
				<OrganizationSection organizationName={organizationName} />
			</>
		</div>
	)
}

const InfoSection = ({ props }) => {
  return (
    <div className="h-[60%] border-2 flex flex-col gap-2 p-4">
      <h1 className={`${text1} font-semibold`}>{props.title}</h1>
      <p className={`${text3} text-gray-500 flex-grow overflow-auto`}>
        {props.description}
      </p>
      <div className="flex gap-4">
        <div className="flex justify-start items-center gap-2">
          <Clock />
          <p className={`${text2}`}>{props.time}</p>
        </div>
        <div className="flex justify-start items-center gap-2">
          <Question />
          <p className={`${text2}`}>{props.questions.length} questions</p>
        </div>
      </div>
    </div>
  );
};

const OrganizationSection = ({ organizationName }) => {
  return (
    <div className="h-[15%] flex items-center">
      <h1 className={`"m-0 font-normal  truncate ${text3}`}>
        Assessment created by{" "}
        <span className="text-color2 font-semibold">{organizationName}</span>
      </h1>
    </div>
  );
};
