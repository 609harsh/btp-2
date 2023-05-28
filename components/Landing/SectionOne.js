import React from "react"
import BgImage from "../../assets/land_mask.png"
import { useRouter } from "next/router"
const SectionOne = () => {
  const router = useRouter()
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-start px-32 md:px-8"
      style={{
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "left right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="heading">
        Test one’s own <br /> domain knowledge
      </h1>
      <span className="summary mt-4">
        An AI based grading platform to evaluate and grade the knowledge of a
        candidate <br /> in a particular technical domain in an interview
        environment.
      </span>
      <button
        className="btn-tertiary mt-4"
        onClick={() => router.push("/auth/signin")}
      >
        Sign In
      </button>
    </div>
  )
}

export default SectionOne
