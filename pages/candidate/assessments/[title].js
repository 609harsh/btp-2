import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import candidateLayout from "../../../layouts/candidateLayout"
import bg_mask from "../../../assets/cand_bg_mask.png"
import { useSelector, useDispatch } from "react-redux"
import {
  getSearchResults,
  getAllAssessments,
} from "../../../redux/actions/candidate.actions"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SearchResults from "../../../components/candidate/SearchResults"
import { useAssessSearch } from "../../../hooks/useAssessSearch"

export default function SearchPage() {
  const router = useRouter()
  const [typeOfSearch, setTypeOfSearch] = useState()
  const [page, setPage] = useState(1)
  const { title } = router.query
  const { assessments, hasMore, loading, error } = useAssessSearch({
    typeOfSearch,
    title,
    page,
  })
  useEffect(() => {
    if (title === 'getAll') {
      setTypeOfSearch('get-all')
    }
    else {
      setTypeOfSearch("normal-search")
    }
    setPage(1)
  }, [title])
  useEffect(() => {
		setPage(1)
	}, [typeOfSearch])

  return (
    <>
      <ToastContainer />
      <div className="pt-[12vh] mx-[8vw] h-max flex flex-col gap-[5vh]">
        <div className="flex gap-2 justify-between">
          {typeOfSearch === "normal-search" && (
            <>
              <h1 className="m-0 text-3xl 2xl:text-2xl text-gray-600">
                showing results for
                <span className="text-color2">{`“${title}”`}</span>
              </h1>

              <button
                className="btn-tertiary"
                onClick={() => setTypeOfSearch("get-all")}
              >
                get All Assessments
              </button>
            </>
          )}
          {typeOfSearch === "get-all" && (
            <h1 className="m-0 text-3xl 2xl:text-2xl text-gray-600">
              showing
              <span className="text-color2">{` All Assessments`}</span>
            </h1>
          )}
        </div>

        <SearchResults
          results={assessments}
          hasMore={hasMore}
          setPage={setPage}
        />
      </div>
      <img
        className="fixed z-[-1] top-0 w-screen h-screen object-cover object-left-top"
        src={bg_mask.src}
      />

      {loading && (
        <h1 className="mt-[30vh] text-center text-3xl font-normal">
          loading ...
        </h1>
      )}
    </>
  )
}

SearchPage.Layout = candidateLayout
