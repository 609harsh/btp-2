import React, { useState, useEffect } from "react"
import { CustomInputGroup, CustomTextAreaGroup } from "../form/CustomInput"
import { PhoneNumberInput } from "../form/PhoneNumberInput"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { saveNewUser } from "../../redux/actions/auth.actions"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
// import LoadingModal from "../Loaders/LoadingModal"

export default function CompanyForm() {
  const router = useRouter()
  const { error } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pswd, setPswd] = useState("")
  const [confirmPswd, setConfirmPswd] = useState("")
  const [errFlag, setErrFlag] = useState(false)

  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [phoneCode, setPhoneCode] = useState({
    id: 101,
    phoneCode: "91",
    iso3: "IND",
  })
  const [contact, setContact] = useState("") //includes only digit value
  const [established, setEstablished] = useState("")
  const [series, setSeries] = useState("")
  const [noOfEmployees, setNoOfEmployees] = useState("")
  const [funding, setFunding] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [twitter, setTwitter] = useState("")
  const [website, setWebsite] = useState("")

  const registerNewUser = () => {
    const body = {
      role: "Organization",
      email,
      password: pswd,
      data: {
        name,
        contact: phoneCode.phoneCode + contact,
        location,
        numberOfEmployees: noOfEmployees,
        series,
        yearOfEstablishment: established,
        funding,
        linkedin:linkedin.toLowerCase(),
        twitter:twitter.toLowerCase(),
        website:website.toLowerCase(),
        description,
      },
    }
    dispatch(saveNewUser(body)).then(()=>{
      setErrFlag(false)
      router.push('/company')
    })
  }

  const createAccount = (e) => {
    e.preventDefault()
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
    if(Number(established)>Number(new Date().getFullYear())){
      toast.error("Enter Valid Year of Establishment")
      setErrFlag(true)
      return
    }
    if(!(linkedin.toLowerCase()).includes("linkedin.com")){
      toast.error("Provide correct linkedin id")
      setErrFlag(true)
      return
    }
    if(!(twitter.toLowerCase()).includes("twitter.com")){
      toast.error("Provide correct linkedin id")
      setErrFlag(true)
      return
    }
    // setErrFlag(false)
    registerNewUser()
  }

  return (
    <div className="overflow-scroll absolute inset-0 pb-[10vh] z-[4] p-8 mt-16 lg:mt-0">
      <ToastContainer />
      {/* <LoadingModal /> */}
      <form onSubmit={createAccount}>
        {/* PRIMARY DATA */}
        <div className="flex gap-x-2 gap-y-8 2xl:gap-y-4 flex-wrap">
          <CustomInputGroup
            labelName="company name"
            placeholder="enter company name"
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
        <div className="flex gap-x-2 gap-y-8 2xl:gap-y-4 flex-wrap mt-[8%]">
          <CustomTextAreaGroup
            required={true}
            labelName="description"
            placeholder="enter value"
            size="max"
            value={description}
            setValue={setDescription}
          />

          <CustomTextAreaGroup
            required={true}
            labelName="location"
            placeholder="enter value"
            size="max"
            value={location}
            setValue={setLocation}
          />
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
            labelName="established"
            placeholder="enter year"
            size="sm"
            value={established}
            setValue={setEstablished}
          />
          <CustomInputGroup
            required={true}
            labelName="no of employees"
            placeholder="enter value"
            type="number"
            size="sm"
            value={noOfEmployees}
            setValue={setNoOfEmployees}
          />
          <CustomInputGroup
            required={true}
            labelName="series"
            placeholder="enter series"
            size="md"
            value={series}
            setValue={setSeries}
          />
          <CustomInputGroup
            required={true}
            labelName="funding"
            placeholder="enter value"
            type="number"
            size="sm"
            value={funding}
            setValue={setFunding}
          />
          <CustomInputGroup
            required={true}
            labelName="linkedin"
            placeholder="enter url"
            size="md"
            value={linkedin}
            setValue={setLinkedin}
          />
          <CustomInputGroup
            labelName="twitter"
            placeholder="enter url"
            size="md"
            value={twitter}
            setValue={setTwitter}
          />
          <CustomInputGroup
            labelName="website"
            placeholder="enter url"
            size="md"
            value={website}
            setValue={setWebsite}
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
