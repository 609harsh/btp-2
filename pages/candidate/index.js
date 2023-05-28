import React from "react"
import bg_mask from "../../assets/cand_bg_mask.png"
import candidateLayout from "../../layouts/candidateLayout"
import Assessments from "../../components/candidate/Assessments"
export default function Dashboard() {
  return (
    <div>
      {/* <CandidateNavbar /> */}
      {/* <div className="h-[200vh]">welcome</div> */}
      <div className="mt-[12vh] mx-[6vw] pb-[5vw] lg:mx-[2vw]">
        <Assessments />
      </div>
      <img
        className="fixed z-[-1] top-0 w-screen h-screen object-cover object-left-top"
        src={bg_mask.src}
      />
    </div>
  )
}

Dashboard.Layout = candidateLayout
