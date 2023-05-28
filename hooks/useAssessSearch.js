import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getSearchResults,
  getAllAssessments,
} from "../redux/actions/candidate.actions"
import { apiServiceInstance } from "../redux/apiUtils"

export function useAssessSearch({ typeOfSearch, title, page }) {
  const { candidateId } = useSelector((state) => state.candidateReducer.details)
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [hasMore, setHasMore] = useState()
  const dispatch = useDispatch()
  const limit = 1000,
    active = true
  async function normalSearch(signal) {
    try {
      const res = await apiServiceInstance.get("/api/searchAssessments/", {
        params: { limit, active, title, page },
        signal,
      })
      setLoading(false)
      setAssessments((obj) => [...obj, ...res?.data])
      setHasMore(res.data.length > 0)
    } catch (error) {
      setLoading(false)
      setError({ message: error.response?.data.message })
    }
  }
  async function getAll(signal) {
    try {
      const res = await apiServiceInstance.get(`/api/getAllAssessments/${candidateId}`, {
        params: { limit, page },
        signal,
      })
      setLoading(false)
      setAssessments((obj) => [...obj, ...res?.data])
      setHasMore(res.data.length > 0)
    } catch (error) {
      setLoading(false)
      setError({ message: error.response?.data.message })
    }
  }
  useEffect(() => {
    const controller = new AbortController()
    if (typeOfSearch === "get-all" && candidateId) {
      setLoading(true)
      getAll(controller.signal)
    } else if (title) {
      setLoading(true)

      normalSearch(controller.signal)
    }
    return () => controller.abort()
  }, [typeOfSearch, title, page , candidateId])

  useEffect(() => {
    setAssessments([])
  }, [typeOfSearch])

  useEffect(() => {
		setAssessments([])
	}, [typeOfSearch, title, candidateId])

  return { assessments, hasMore, loading, error }
}
