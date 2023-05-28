import { idleStyle, errorStyle, labelStyle } from "./CustomInput"
import countriesData from "../../data/countries-states_29.06.json"

const inputStyle = `outline-none  text-3xl 2xl:text-xl 2sm:text-base font-light 
  p-4 2xl:px-2 2xl:py-2 2xl:h-[48px]
  `
const phoneCodes = countriesData.map((i) => ({
  id: i.id,
  phoneCode: i.phone_code,
  name:i.name,
  iso3: i.iso3,
}))

export function PhoneNumberInput({labelName, required,value,  setValue,  size,  error,  contact,  setContact,}) {
  const handleNumberChange=(e)=>{
    if(e.target.value.length <= 10) setContact(e.target.value)
  }
  const handleSelected = (e) => {
    
    const id = parseInt(e.target.value)
    setValue(phoneCodes.find((i) => i.id === id))
  }
  const wrapper = ` flex flex-col gap-4 2xl:gap-1 
   ${size === "max" && "min-w-full"}
    ${size === "md" && "w-[32rem] 2xl:w-[25rem]"}
    ${size === "sm" && "w-[15rem] 2xl:w-[10rem]"}
  `
  return (
    <div className={`${wrapper}`}>
      <p className={`${labelStyle} mb-0`}>
        {labelName}
        {required && <span className="px-1 text-warning">*</span>}
      </p>
      <div
        className={`flex flex-grow ${inputStyle} ${
          error ? errorStyle : idleStyle
        }`}
      >
        <select
          className="w-max px-2  bg-primary-lighter  outline-none"
          value={value.id}
          required={required === false ? false : true}
          onChange={handleSelected}
        >
          {phoneCodes.map((i) => (
            // data-name={i}
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
        <div className="grid place-items-center w-max px-2 bg-primary-lighter">
          {"+" + value.phoneCode}
        </div>
        <input
          className="flex-grow
            outline-none w-[90%] border-2 h-full
          "
          type="number"
          required={required}
          value={contact}
          onChange={handleNumberChange}
          maxLength="11"
        />
      </div>
    </div>
  )
}
