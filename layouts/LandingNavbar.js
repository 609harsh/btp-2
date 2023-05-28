import React from "react"
import Image from "next/image"
import Logo from "../assets/logo.png"
import useWindowDimensions from "../hooks/useWindowDimensions "
import { useRouter } from "next/router"

const LandingNavbar = () => {
  const { height, width } = useWindowDimensions()
  const router = useRouter()
  return (
    <div className="w-full fixed top-0 left-0 right-0 px-16 md:px-4 py-2 flex justify-between items-center">
      <Image
        src={Logo}
        alt="Logo"
        width={width < 600 ? 105 : 150}
        height={width < 600 ? 35 : 50}
      />
      <div className="flex flex-row">
        <button
          className="btn-primary mr-4"
          onClick={() => router.push("/auth/signin")}
        >
          Sign In
        </button>
        <button
          className="btn-secondary"
          onClick={() => router.push("/auth/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default LandingNavbar
