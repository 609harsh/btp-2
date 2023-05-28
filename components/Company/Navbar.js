import React, { useEffect, useState } from "react"
import Image from "next/image"
import Logo from "../../assets/logo.png"
import useWindowDimensions from "../../hooks/useWindowDimensions "
import { companyTabs } from "../../data"
import { DownArrow } from "../../assets/icons"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { logoutUser } from "../../redux/reducers/auth.reducer"
import { clearStoreCompanyData } from "../../redux/reducers/company.reducer"
import useAuth from "../../hooks/useAuth"
import { LogoutIcon } from "../candidate/icons"
import pimg from "../../assets/blank-profile.jpg"
import { SearchIcon, CrossIcon } from "../candidate/icons"

const Navbar = ({ show, activeTab, setActiveTab }) => {
  const { height, width } = useWindowDimensions()
  const router = useRouter()
  const dispatch = useDispatch()

  const activeClass = `border-color1`
  const CompanyName = useSelector(
    (state) => state?.companyReducer?.details?.name
  )
  const handleLogOut = () => {
    dispatch(logoutUser())
    dispatch(clearStoreCompanyData())
    router.push("/")
  }

  // ACCESS CONTROL
  const auth = useAuth()
  useEffect(() => {
    if (!auth) router.push("/landing")
    else if (auth?.userId && auth?.role === "Candidate")
      router.push("/candidate")
  }, [])

  // END OF  ACCESS CONTROL
  const tab1=companyTabs[0];
  const tab2=companyTabs[1];
  return (
    <div className="w-full top-0 left-0 right-0 px-16 md:px-4  flex flex-col  justify-between border-b-2 border-b-gray-300 ">
      <div className="w-full px-16 md:px-4 flex flex-row justify-between ">
        <Image
          src={Logo}
          alt="Logo"
          width={width < 600 ? 105 : 150}
          height={width < 600 ? 35 : 50}
        />
        {show && width > 700 && (
          <div className="flex flex-row  justify-between gap-8">
            <div className={`cursor-pointer ${tab1.id==activeTab?"border-t-color1":"border-white"} border-t-8 `}>
              <p onClick={() => setActiveTab(tab1.id)} className="font-semibold text-xl mt-2">Dashboard</p>
            </div>
            <div className={`cursor-pointer ${tab2.id==activeTab?"border-t-color1":"border-white"} border-t-8 `}>
              <p onClick={() => setActiveTab(tab2.id)} className="font-semibold text-xl mt-2">Notifications</p>
            </div>
          </div>

            
        )}
        <div className="m-2 grow max-w-md">
            <div className="flex flex-row gap-2 border-2 h-full  items-center  p-2 ">
              <SearchIcon  className="h-full"/>
              <input type="text" placeholder="Search Courses" className="w-full" ></input>
            </div>           
        </div>
        <div className="flex justify-center items-center cursor-pointer gap-5">
          <span>
            <img className="w-[3rem] aspect-square 2xl:w-[2.5rem] 2xl:h-[2.5rem] rounded-full outline-2 outline-color1-dark"
              src={pimg.src}
              alt="profile"
              onClick={()=>router.push('/company/accounts')}
            />
          </span>
          <span className="mr-4">{CompanyName}</span>
          {/* <DownArrow /> */}
          <button onClick={handleLogOut}>
            <LogoutIcon />
          </button>
        </div>
      </div>
      {show && width <= 700 && (
        <div className="flex flex-row w-full justify-between items-center mt-8 px-2">
          {companyTabs.map((tab, index) => (
            <span
              key={index}
              className={`cursor-pointer ${
                tab.id == activeTab && activeClass
              } `}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </span>
          ))}
        </div>
      )}
    </div>



    // <div className="flex flex-row gap-10 mx-auto">
    //   <div>
    //   <Image
    //       src={Logo}
    //       alt="Logo"
    //       width={width < 600 ? 105 : 150}
    //       height={width < 600 ? 35 : 50}
    //     />
    //   </div>
    //   <div className="flex flex-row">
    //     <div>
    //       <span>Dashboard</span>
    //     </div>
    //     <div>
    //       <span>Notifications</span>
    //     </div>
    //   </div>
    //   <div>
    //     <div className="flex flex-row gap-2 border-2">
    //       <SearchIcon />
    //       <input type="text" placeholder="Search Courses"  ></input>
    //     </div>
    //   </div>
    //   <div className="flex flex-row">
    //     <span>
    //       <img src={pimg.src} alt="profile" className="h-2 w-2"/>
    //     </span>
    //     <span className="mr-4">{CompanyName}</span>
    //     <button onClick={handleLogOut}>
    //       <LogoutIcon />
    //     </button>
    //   </div>
    // </div>
  )
}

export default Navbar
