import React from "react"
const idleStyle = ` border-2 border-gray-300`
const errorStyle = `border-2 border-error`
const labelStyle = `text-3xl 2xl:text-lg 2sm:text-base  capitalize truncate`

const inputStyle = `outline-none  text-3xl 2xl:text-xl 2sm:text-base font-light 
  px-4 py-6 2xl:px-2 2xl:py-2 
  `
export { idleStyle, errorStyle, labelStyle, inputStyle }

export function CustomInputGroup({
  labelName,
  placeholder,
  type,
  size,
  required,
  error,
  value,
  setValue,
}) {
  const wrapper = ` flex flex-col gap-4 2xl:gap-1 
   ${size === "max" && "min-w-full"}
    ${size === "md" && "w-[32rem] 2xl:w-[25rem]"}
    ${size === "sm" && "w-[15rem] 2xl:w-[10rem]"}
  `
  return (
    <div className={`${wrapper}`}>
      <div className={`${labelStyle}`}>
        {labelName}
        {required && <span className="px-1 text-warning">*</span>}
      </div>
      <input
        className={`${inputStyle} ${error ? errorStyle : idleStyle} ${
          value?.length && "invalid:border-2 invalid:border-error"
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type ? type : "text"}
        placeholder={placeholder}
        required={required || false}
      />
    </div>
  )
}

export function CustomTextAreaGroup({
  labelName,
  placeholder,
  size,
  required,
  error,
  value,
  setValue,
}) {
  const wrapper = ` flex flex-col gap-4 2xl:gap-1 
   ${size === "max" && "min-w-full"}
    ${size === "md" && "w-[32rem] 2xl:w-[25rem]"}
    ${size === "sm" && "w-[15rem] 2xl:w-[10rem]"}
  `
  return (
    <div className={`${wrapper}`}>
      <div className={`${labelStyle}`}>
        {labelName} {required && <span className="px-1 text-warning">*</span>}
      </div>
      <textarea
        className={`${inputStyle} ${error ? errorStyle : idleStyle} ${
          value?.length && "invalid:border-2 invalid:border-error"
        }`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required || false}
      />
    </div>
  )
}
