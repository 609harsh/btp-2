import React from "react"
import Image from "next/image"
import Logo from "../../assets/logo.png"
import useWindowDimensions from "../../hooks/useWindowDimensions "
import { useRouter } from "next/router"

export default function SigninNavbar() {
  const { height, width } = useWindowDimensions()
  const router = useRouter()
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-[9] px-16 md:px-4 2xl:py-2 py-8  flex justify-between items-center">
      <div
        className="hover:cursor-pointer "
        onClick={() => router.push("/landing")}
      >
        <img
          src={Logo.src}
          alt="Logo"
          // className="w-[10vw]"
          width={width < 600 ? 105 : 150}
          height={width < 600 ? 35 : 50}
           onClick={() => router.push("/landing")}
        />
      </div>
    </div>
  )
}
