import React, { useEffect } from "react"
import candimg from "../../assets/signin_up/cand_md.jpg"
import companyimg from "../../assets/signin_up/cmpy_md.jpg"
import leftarwimg from "../../assets/icons/left-arrow.png"
import CompanyForm from "./CompanyForm"
import CandidateForm from "./CandidateForm"

export default function SignupStepTwo({
  setCurrStep,
  selectedRole,
  setSelectedRole = { setSelectedRole },
}) {
  const goBack = () => {
    setSelectedRole("")
    setCurrStep(1)
  }

  return (
    <div className=" overflow-y-hidden relative w-screen h-screen">
      <SectionLeft
        setCurrStep={setCurrStep}
        goBack={goBack}
        selectedRole={selectedRole}
      />

      <div className=" absolute right-0 h-full w-[60%] lg:w-[100%] lg:h-[70%] lg:top-[30%]">
        {selectedRole === "company" ? <CompanyForm /> : <CandidateForm />}
      </div>
      <span
        className="z-[3] absolute w-[20%] h-[120%] lg:hidden rotate-12 xl:rotate-6 
      translate-x-[160%] xl:translate-x-[170%]"
      >
        <span className=" absolute w-[10%] h-full bg-color1-tint" />
        <span className=" absolute left-4 w-full h-full bg-white" />
      </span>
    </div>
  )
}

function SectionLeft({ setCurrStep, selectedRole, goBack }) {
  return (
    <div className="absolute left-0 h-full w-[40%] lg:w-[100%] lg:h-[30%]">
      {/* BACK BUTTON */}
      <div
        className="absolute z-[4] left-[5%] top-[5%]  3sm:left-[2%] 3sm:top-[10%] "
        onClick={goBack}
      >
        <button className="flex gap-2 items-center">
          <img
            className="w-[3rem] h-[3rem] 3sm:w-[1.5rem] 3sm:h-[1.5rem] 2xl:w-[2.25rem] 2xl:h-[2.25rem]"
            src={leftarwimg.src}
            alt="company"
          />
          <div className="text-5xl 2xl:text-3xl 3sm:text-2xl font-light text-white">
            back
          </div>
        </button>
      </div>
      {/* END OF BACK BUTTON */}

      <div
        className="absolute w-[80%] mt-[35vh] lg:inset-0 lg:m-auto lg:w-[100%]  z-[3]
       flex flex-col items-center justify-center"
      >
        <h1 className="text-8xl 2xl:text-7xl xl:text-5xl 2sm:text-4xl font-bold text-white font-style1 text-center">
          {selectedRole}
        </h1>
        <p className="mt-8 lg:mt-4 2sm:mt-0 text-5xl 2xl:text-3xl xl:text-2xl 2sm:text-xl text-white font-style1 text-center">
          complete the sign up process
        </p>
      </div>

      <div className="absolute  inset-0 z-[1]">
        <span className="absolute inset-0 bg-[rgba(0,0,0,.5)]" />
        <img
          className="w-full h-full object-cover"
          src={selectedRole === "company" ? companyimg.src : candimg.src}
          alt="company"
        />
      </div>
    </div>
  )
}
