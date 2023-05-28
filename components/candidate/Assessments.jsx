import React, { useState } from "react";
import AssessmentCard from "./AssessmentCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Assessments() {
  const { upcomingAssessments, attemptedAssessments, appliedAssessments } =
    useSelector((state) => state.candidateReducer);

  const [activeTab, setActiveTab] = useState("upcoming");
  const [tabResult, setTabResult] = useState([]);
  const getFullDetails = async (objs) => {
    const full = await objs?.map(async (obj) => {
      let info;
      await getAssessmentDetails(obj.assessmentId).then((res) => {
        info = res;
      });
      console.log(full);
      return info;
    });
    return full;
  };
  useEffect(() => {
    if (activeTab === "upcoming") setTabResult(upcomingAssessments);
    else if (activeTab === "attempted") setTabResult(attemptedAssessments);
    else if (activeTab === "applied") setTabResult(appliedAssessments);
  }, [
    activeTab,
    upcomingAssessments,
    attemptedAssessments,
    appliedAssessments,
  ]);

  console.log("tab result: ",tabResult);

  return (
    <div className="flex flex-col gap-16 lg:gap-12 h-max">
      <AssessmentHeader props={{ activeTab, setActiveTab }} />
      <div
        // justify-items-center justify-center
        className="grid justify-items-center gap-8 
      grid-cols-[repeat(auto-fit,minmax(32rem,.25fr))]
      2xl:grid-cols-[repeat(auto-fit,minmax(25rem,.25fr))]
      lg:grid-cols-[repeat(auto-fit,minmax(22rem,.25fr))]
      md:grid-cols-[repeat(auto-fit,minmax(18rem,.25fr))]
      "
      >
        {tabResult?.map((obj, index) => {
          if(obj?.assessmentId) return (
						<AssessmentCard
							key={index}
							status={activeTab}
							data={obj?.assessmentId}
						/>
					)
        })}
      </div>
      {/* <button className="mx-auto w-max px-[.75em] py-[.25em] text-2xl font-light rounded-md border-2 border-gray-300">
        view more
      </button> */}
    </div>
  );
}

const AssessmentHeader = ({ props }) => {
  const { upcomingAssessments, attemptedAssessments, appliedAssessments } =
    useSelector((state) => state.candidateReducer);
  const { activeTab, setActiveTab } = props;
  const handleActiveTab = (name) => {
    setActiveTab(name);
  };
  //
  return (
    <div
      className="mt-[5vh] min-h-[4rem] 2xl:min-h-[3.5rem] lg:min-h-[3rem]
    border-b-[1px] 3sm:border-b-0  flex flex-wrap gap-12 lg:gap-6 3sm:gap-4
     border-gray-300 bg-white px-2 font-style1"
    >
      <h1 className="m-0 text-4xl 2xl:text-2xl lg:text-2xl 3sm:border-b-[1px]">
        Assessments
      </h1>
      <div className="flex gap-8 3sm:gap-4 3sm:gap-y-6 flex-wrap">
        <Tabs
          name={"upcoming"}
          count={upcomingAssessments?.length}
          activeTab={activeTab}
          activeFnc={handleActiveTab}
        />
        <Tabs
          name={"attempted"}
          count={attemptedAssessments?.length}
          activeTab={activeTab}
          activeFnc={handleActiveTab}
        />
        <Tabs
          name={"applied"}
          count={appliedAssessments?.length}
          activeTab={activeTab}
          activeFnc={handleActiveTab}
        />
      </div>
    </div>
  );
};

const Tabs = ({ name, count, activeTab, activeFnc }) => {
  const opt = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };
  return (
    <div
      className={`relative h-full flex items-start gap-2 3sm:h-max 
    ${
      name === activeTab &&
      `before:absolute before:bottom-0 3sm:before:bottom-[-30%] before:w-full before:h-[.25em] before:bg-color2`
    }`}
    >
      <h3
        className={`text-3xl 2xl:text-xl lg:text-lg m-0 capitalize cursor-pointer
        ${name !== activeTab && "text-gray-600"}`}
        onClick={() => activeFnc(name)}
      >
        {name}
      </h3>
      <div
        className="rounded-full aspect-square h-[2.5rem] 2xl:h-[2rem] lg:h-[1.75rem] flex items-center justify-center
      bg-color2-tint"
      >
        <p className="m-0 text-lg 2xl:text-base lg:text-sm text-color2 font-medium">
          {
            count
            // count.toLocaleString("en-US", opt)
          }
        </p>
      </div>
    </div>
  );
};
