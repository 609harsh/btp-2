import React from "react"
import BgImage from "../../assets/land_bg_2.png"
const SectionTwo = () => {
  return (
    <div
      className="w-screen h-full flex flex-col justify-center items-center px-32 md:px-8 py-32 mt-12"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "left right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="heading-2 flex text-center">
        Get instant analysis on domain-specific technical knowledge
      </h1>
      <span className="mt-4 text-center description">
        Helps candidate to improve skills and makes company to know the ability
        of candidate’s technical knowledge{" "}
      </span>
    </div>
  )
}

export default SectionTwo
