import React from "react"
import logo from "../../../assets/logo.png"
import Profile from "./Profile"
import SearchBar from "./SearchBar"
import { useRouter } from "next/router"
import Link from "next/link"
import useAuth from "../../../hooks/useAuth"
import { useEffect } from "react"
import useWindowDimensions from "../../../hooks/useWindowDimensions "
import { MenuRightIcon, SearchIcon } from "../icons"
import { useState } from "react"

export default function Navbar() {
  const { height, width } = useWindowDimensions()
  const [openMenu, setOpenMenu] = useState(false)
  const router = useRouter()

  // ACCESS CONTROL
  const auth = useAuth()
  useEffect(() => {
    if (!auth) router.push("/landing")
    else if (auth?.userId && auth?.role === "Organization")
      router.push("/company")
  }, [])
  useEffect(() => {
    if (openMenu && width <= 600) {
      document.body.style.overflow = "hidden"
    } else document.body.style.overflow = "visible"
  }, [openMenu])
  // END OF  ACCESS CONTROL
  // grid-cols-[.05fr_.1fr_.25fr_.25fr_.15fr_.05fr]
  return (
    <nav
      className={`fixed z-[999] top-0 w-screen h-[5.5rem] 2xl:h-[4.25rem] 
      border-b-[1px] bg-white border-b-gray-300
        px-[100px] 2xl:px-[60px] lg:px-[20px] 3sm:px-[10px]
        grid grid-cols-12 gap-4 items-center
        3sm:grid-cols-6 `}
    >
      <img
        className="h-[65%] aspect-[3/1] col-[1/3] 3sm:col-[1/4]"
        // width={width < 600 ? 105 : 150}
        // height={width < 600 ? 35 : 50}
        src={logo.src}
        alt="logo"
      />
      {width > 600 ? (
        <>
          <NavLinks />
          <SearchBar />
          <Profile />
        </>
      ) : (
        <>
          <div className="col-[-1] flex items-center gap-4 m-auto">
            <button>
              <SearchIcon />
            </button>
            <button onClick={() => setOpenMenu(!openMenu)}>
              <MenuRightIcon />
            </button>
          </div>
        </>
      )}

      {width <= 600 && openMenu && (
        <div
          className="w-screen h-screen fixed bg-[rgba(0,0,0,.4)] left-0 top-[5.5rem] 2xl:top-[4.25rem] 
    
        "
        >
          <div className="abolute w-full h-max pb-5 bg-white flex flex-col gap-8 py-[.75rem] px-[.5rem]">
            <NavLinks />
            <SearchBar />
            <Profile />
          </div>
        </div>
      )}
    </nav>
  )
}

const NavLinks = () => {
  return (
    <div className="col-[3/7] grid grid-cols-3   h-full 3sm:h-max" >
      <NavLink path="/candidate" name="Dashboard" id='/candidate'/>
      <NavLink path="/candidate/assessments/getAll" name="All Assessments" id='/candidate/assessments/[title]'/>
    </div>
  )
}

const NavLink = ({ name, path , id}) => {
  const router = useRouter()
  return (
    <div
      className={`relative w-max h-full flex 3sm:flex-col items-center 3sm:py-[.75rem] 3sm:px-[.5rem]
     ${
       router.pathname === id &&
       `before:absolute before:top-0 before:w-full before:h-[.25rem] before:bg-color1`
     }`}
    >
      <Link href={path}>
        <p
          className={`m-0 text-2xl 2xl:text-xl cursor-pointer ${
            router.pathname !== id ? "text-gray-600" : "font-medium"
          }`}
        >
          {name}
        </p>
      </Link>
    </div>
  )
}
