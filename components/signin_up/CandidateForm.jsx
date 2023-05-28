import React, { useState, useEffect } from "react"
import { CustomInputGroup, CustomTextAreaGroup } from "../form/CustomInput"
import { PhoneNumberInput } from "../form/PhoneNumberInput"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { saveNewUser } from "../../redux/actions/auth.actions"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

export default function CandidateForm() {
  const router = useRouter()
  const { error } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pswd, setPswd] = useState("")
  const [confirmPswd, setConfirmPswd] = useState("")
  const [errFlag, setErrFlag] = useState(false)

  const [about, setAbout] = useState("")
  const [phoneCode, setPhoneCode] = useState({
    id: 101,
    phoneCode: "91",
    iso3: "IND",
  })
  const [contact, setContact] = useState("") //includes only digit value

  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [institute, setInstitute] = useState("")
  const [degree, setDegree] = useState("")
  const [passingYear, setpassingYear] = useState("")
  const [experience, setExperience] = useState("")
  const [expectedCTC, setExpectedCTC] = useState("")
  const [fieldOfInterest, setFieldofInterest] = useState("")
  const [skills, setSkills] = useState("")

  const registerNewUser = () => {
    const body = {
      role: "Candidate",
      email,
      password: pswd,
      data: {
        name,
        institute,
        phone: phoneCode.phoneCode + contact,
        portfolio,
        experience,
        expectedCTC,
        yearOfPassing: passingYear,
        field: fieldOfInterest,
        skills: skills.split(","),
        linkedin:linkedin.toLowerCase(),
        github:github.toLowerCase(),
      },
    }
    dispatch(saveNewUser(body)).then((res)=>{
      if(res.error){
				toast.error(res.error.msg)
				return
			}
      router.push('/candidate')
    })
  }

  const createAccount = (e) => {

    e.preventDefault()
    // setErrFlag(false)
    // email already used
    // validate pswd
    // confirm pswd
    if (pswd.length < 8) {
      toast.error("password should be atleast 8 characters length")
      setErrFlag(true)
      return
    } else if (pswd !== confirmPswd) {
      toast.error("password doesn't match")
      setErrFlag(true)
      return
    }
    if (contact.length > 10) {
      toast.error("phone number exceeds 10 digits")
      setErrFlag(true)
      return
    }
    if(!(linkedin.toLowerCase()).includes("linkedin.com")){
      toast.error("Provide correct linkedin id")
      setErrFlag(true)
      return
    }
    if(!(github.toLowerCase()).includes("github.com")){
      toast.error("Provide correct github id")
      setErrFlag(true)
      return
    }
    if(Number(passingYear)<Number(new Date().getFullYear())){
      toast.error("Enter Valid Year of Passing")
      setErrFlag(true)
      return
    }
    // setErrFlag(false)
    // toast.success("User Created");
    registerNewUser()
  }


  return (
    <div className="overflow-scroll absolute inset-0 pb-[15vh] z-[4] p-8 mt-16 lg:mt-0">
      <ToastContainer />
      <form className="flex gap-x-2 gap-y-8 2xl:gap-y-4 flex-wrap" onSubmit={createAccount}>
        {/* PRIMARY DATA */}

        <div
          className="flex gap-x-2 gap-y-8 2xl:gap-y-4 flex-wrap">
          <CustomInputGroup
            labelName="name"
            placeholder="enter name"
            size="md"
            required={true}
            value={name}
            setValue={setName}
          />
          <CustomInputGroup
            error={error.message === "Email Already Used"}
            labelName="email id"
            placeholder="enter email id"
            required={true}
            type="email"
            size="md"
            value={email}
            setValue={setEmail}
          />
          <CustomInputGroup
            labelName="set password"
            placeholder="enter new password"
            type="password"
            size="md"
            required={true}
            value={pswd}
            setValue={setPswd}
            error={errFlag && pswd.length < 8}
          />
          <CustomInputGroup
            error={errFlag && confirmPswd?.length && pswd !== confirmPswd}
            required={true}
            labelName="confirm password"
            placeholder="confirm password"
            type="password"
            size="md"
            value={confirmPswd}
            setValue={setConfirmPswd}
          />
        </div>
        {/* END OF PRIMARY DATA */}

        {/* SECONDARY DATA */}
        <div className="flex gap-x-2 gap-y-8  2xl:gap-y-4 flex-wrap mt-[8%]" >
          {/* <CustomTextAreaGroup
            // required={true}
            labelName="about yourself"
            placeholder="enter details"
            size="max"
            value={about}
            setValue={setAbout}
          /> */}
          <PhoneNumberInput
            labelName="phone"
            required={true}
            size="md"
            value={phoneCode}
            setValue={setPhoneCode}
            contact={contact}
            setContact={setContact}
          />
          <CustomInputGroup
            required={true}
            labelName="linkedin"
            placeholder="enter value"
            size="md"
            value={linkedin}
            setValue={setLinkedin}
          />
          <CustomInputGroup
            required={true}
            labelName="github"
            placeholder="enter value"
            size="md"
            value={github}
            setValue={setGithub}
          />
          <CustomInputGroup
            labelName="personal portfolio"
            placeholder="enter value"
            size="md"
            value={portfolio}
            setValue={setPortfolio}
          />

          <CustomInputGroup
            required={true}
            labelName="institute name"
            placeholder="enter value"
            size="md"
            value={institute}
            setValue={setInstitute}
          />
          <CustomInputGroup
            required={true}
            labelName="degree"
            placeholder="enter value"
            size="sm"
            value={degree}
            setValue={setDegree}
          />
          <CustomInputGroup
            required={true}
            labelName="year of passing"
            placeholder="enter value"
            size="sm"
            value={passingYear}
            setValue={setpassingYear}
          />
          <CustomInputGroup
            required={true}
            labelName="experience"
            placeholder="enter value"
            type="number"
            size="sm"
            value={experience}
            setValue={setExperience}
          />
          <CustomInputGroup
            type="number"
            required={true}
            labelName="expected CTC"
            placeholder="enter value"
            size="sm"
            value={expectedCTC}
            setValue={setExpectedCTC}
          />
          <CustomInputGroup
            required={true}
            labelName="field of interest"
            placeholder="enter value"
            size="sm"
            value={fieldOfInterest}
            setValue={setFieldofInterest}
          />

          <CustomInputGroup
            required={true}
            labelName="skills [ write in comma seperated ]"
            placeholder="ex: java, c++, python, web development"
            size="max"
            value={skills}
            setValue={setSkills}
          />
        </div>
        {/* END OF SECONDARY DATA */}
        <button type="submit" className="btn-primary mt-12 3sm:mt-6">
          create account
        </button>
      </form>
    </div>
  )
}
