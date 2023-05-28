import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/candidate/navbar/Navbar"
import {
  getCandidateDetail,
  getApplications,
} from "../redux/actions/candidate.actions"
export default function candidateLayout({ children }) {
  const { candidateId } = useSelector((state) => state.candidateReducer.details)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCandidateDetail())
  }, [])
  useEffect(() => {
    if (candidateId) dispatch(getApplications({ candidateId }))
  }, [candidateId])
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
