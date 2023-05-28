import React, { useState } from "react"
import SignupStepOne from "../../components/signin_up/SignupStepOne"
import SignupStepTwo from "../../components/signin_up/SignupStepTwo"
import LoadingModal from "../../components/Loaders/LoadingModal"
import { useSelector } from "react-redux"
export default function Signup() {
  const [currStep, setCurrStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState("")
  const {signupLoading} = useSelector(state=>state.authReducer)
  if (currStep == 1)
    return (
      <SignupStepOne
        setCurrStep={setCurrStep}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    )
  return (
    <>
    {signupLoading && <LoadingModal />}
    <SignupStepTwo
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
      setCurrStep={setCurrStep}
    />
    </>
  )
}
