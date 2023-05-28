import React from "react"
export default function RoleCard({
  role,
  selected,
  setSelected,
  img,
  setCurrStep,
}) {
  return (
    <div
      className="relative w-[32rem] h-[28rem] 
    2xl:w-[23rem] 2xl:h-[20rem] lg:w-[30vw] lg:h-[27vw] 3sm:w-[34vh] 3sm:h-[30vh]
    shadow-2xl rounded-3xl"
      onClick={() => {
        setSelected(role)
        setTimeout(() => setCurrStep(2), 200)
      }}
    >
      <div
        className={`absolute w-full h-[20%] z-[2]  rounded-t-3xl
            ${selected === role ? `bg-color1-tint` : "bg-white"}
       text-center`}
      >
        <h3
          className={`text-5xl 2xl:text-3xl lg:text-xl sh:text-md  py-4 xl:py-2 sh:py-0 text-black font-light`}
        >
          {role}
        </h3>
      </div>
      {selected === role && (
        <div
          className={`absolute z-[2] left-[5%] bottom-[5%]
       bg-color1-tint rounded-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[3.25rem] h-[3.25rem] 2xl:w-[2.25rem] 2xl:h-[2.25rem]"
            viewBox="0 0 24 24"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
          </svg>
        </div>
      )}
      <div className="absolute inset-0 z-[1]">
        <img
          className="w-full h-full object-cover rounded-3xl"
          src={img.src}
          alt="role_img"
        />
      </div>
    </div>
  )
}
