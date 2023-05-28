import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { SearchIcon, CrossIcon } from "../icons"
// import { SearchIcon, CrossIcon } from "../../../assets/icons"

export default function SearchBar() {
  const [word, setWord] = useState("")
  const router = useRouter()
  const { title } = router.query
  useEffect(() => {
    if (title !== 'getAll') {
      setWord(title)
    }
    else {
      setWord('')
    }
  }, [title])

  return (
    <div
      className="col-[8/11] 2sm:col-[4/6] flex gap-4  w-full h-[4rem] 2xl:h-[3rem] px-4 py-2
       items-center justify-between
    border-2"
    >
      <form
        className="w-[90%] flex gap-4 items-center"
        onSubmit={(e) => {
          e.preventDefault()
          if (!word) return
          router.push(`/candidate/assessments/${word}`)
        }}
      >
        <button type="submit">
          <SearchIcon />
        </button>

        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="
          peer/search
          w-full h-[2.5rem] 2xl:h-[2rem] 
           text-2xl 2xl:text-xl font-thin
          outline-none "
          placeholder="search assessments"
        />
        {/* <div
          className="relative w-[20rem] h-[2.5rem] 2xl:h-[1.75rem] text-2xl 2xl:text-xl font-thin
          border-2
          peer/search-focus:before:absolute peer/search-focus:before:z-[1] peer/search-focus:before:bottom-[-5%] peer/search-focus:before:w-full peer/search-focus:before:h-[2px] peer/search-focus:before:bg-color1-dark
          "
        ></div> */}
      </form>
      {word?.length > 0 && (
        <button
          onClick={() => {
            setWord("")
          }}
        >
          <CrossIcon size="md" />
        </button>
      )}
    </div>
  )
}
