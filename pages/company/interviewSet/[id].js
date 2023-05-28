import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InterviewSetComponent from "../../../components/Company/InterviewSetComponent"
import Navbar from "../../../components/Company/Navbar"
import {
  getCurrentAssessmentDetails,
  getAssessmentRequests,
} from "../../../redux/actions/company.actions"

const InterviewSet = () => {
  const router = useRouter()
  const id = router.query.id
  const dispatch = useDispatch()
  const loading = useSelector((state) => state?.companyReducer?.loading)

  const getDetails = () => {
    dispatch(
      getCurrentAssessmentDetails({
        assessmentId: id,
      })
    )
    dispatch(
      getAssessmentRequests({
        assessmentId: id,
      })
    )
  }

  useEffect(() => {
    if (id) {
      getDetails()
    }
  }, [id])

  return (
    <div className="w-full h-full flex flex-col">
      {!loading && (
        <>
          <Navbar show={false} />
          <InterviewSetComponent getDetails={ getDetails} />
        </>
      )}
    </div>
  )
}

export default InterviewSet
