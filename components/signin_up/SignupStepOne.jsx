import React, { useState, useEffect } from "react"
import wave1 from "../../assets/signin_up/login_wave1.png"
import companyimg from "../../assets/signin_up/cmpy_md.jpg"
import candidateimg from "../../assets/signin_up/cand_md.jpg"
import RoleCard from "./RoleCard"
import SigninNavbar from "./SigninNavbar"
import useAuth from "../../hooks/useAuth"
import { useRouter } from "next/router"
export default function SignupStepOne({
  setCurrStep,
  setSelectedRole,
  selectedRole,
}) {
  const router = useRouter()
  const auth = useAuth()
  useEffect(() => {
    if (auth?.role == "Candidate" && auth?.userId) router.push("/candidate")
    else if (auth?.role == "Organization" && auth?.userId)
      router.push("/company")
  }, [auth])
  return (
    <div className="relative w-screen h-screen border">
      <SigninNavbar />
      <div
        className="absolute z-[3] inset-0 m-auto flex flex-col
      items-center justify-center mx-[10rem] xl:mx-[5rem]"
      >
        <div
          className="w-max flex items-center justify-center flex-col gap-4 
        mb-[10vh] 2xl:mb-[8vh] lg:mb-[6vh] lg:gap-2 sm:gap-0"
        >
          <span className="h-2 2sm:h-1 w-[80%] bg-color1 rounded-lg "></span>
          <h3 className="text-6xl 2xl:text-5xl lg:text-4xl 2sm:text-2xl">
            choose account type
          </h3>
          <span className="h-2 2sm:h-1 w-[50%] bg-color1 rounded-lg"></span>
        </div>
        <div className="flex gap-12 md:gap-6 3sm:flex-col 3sm:gap-4">
          <RoleCard
            role="company"
            selected={selectedRole}
            setSelected={setSelectedRole}
            setCurrStep={setCurrStep}
            img={companyimg}
          />
          <RoleCard
            role="candidate"
            selected={selectedRole}
            setSelected={setSelectedRole}
            setCurrStep={setCurrStep}
            img={candidateimg}
          />
        </div>
      </div>

      {/* NEXT BUTTON */}
      {/* <div
        className={`absolute z-[4]  right-[10%] bottom-[10%] 2sm:right-[5%] 2sm:bottom-[2.5%] ${
          !selectedRole ? "opacity-40" : "opacity-100"
        }`}
        onClick={() => selectedRole && setCurrStep(2)}
      >
        <button className="flex gap-2 items-center">
          <h1 className="text-5xl 2xl:text-3xl 2sm:text-2xl font-light">
            next
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[3rem] h-[3rem] 2xl:w-[2.25rem] 2xl:h-[2.25rem] 2sm:w-[1.25rem] 2sm:h-[1.25rem]"
            viewBox="0 0 24 24"
          >
            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
          </svg>
        </button>
      </div> */}
      {/* END OF NEXT BUTTON */}

      <div className="absolute bottom-0">
        <img src={wave1.src} alt="wave1" />
      </div>
    </div>
  )
}
