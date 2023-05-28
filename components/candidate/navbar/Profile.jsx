import React from "react"
import pimg from "../../../assets/blank-profile.jpg"
import { LogoutIcon } from "../icons"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../../redux/reducers/auth.reducer"
import { useRouter } from "next/router"

export default function Profile() {
  const { name } = useSelector((state) => state.candidateReducer.details)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/")
  }
  return (
    <div className="col-[11/-1]   w-full flex gap-4 items-center">
      <img
        className="w-[3rem] aspect-square 2xl:w-[2.5rem] 2xl:h-[2.5rem] rounded-full outline-2 outline-color1-dark"
        src={pimg.src}
        alt="profile"
        onClick={()=>router.push('/candidate/accounts')}
      />
      <p className="m-0 text-2xl 2xl:text-xl font-light truncate">{name}</p>

      <button onClick={handleLogout}>
        <LogoutIcon />
      </button>
    </div>
  )
}
