import React, {useEffect} from "react"
import {useRouter} from "next/router"
import useAuth from "../hooks/useAuth"
import LandingNavbar from "../layouts/LandingNavbar"
import SectionOne from "../components/Landing/SectionOne"
import SectionTwo from "../components/Landing/SectionTwo"
import SectionThree from "../components/Landing/SectionThree"
import Footer from "../layouts/Footer"

const Landing = () => {
	const router = useRouter()

	// ACCESS CONTROL
	const auth = useAuth()
	useEffect(() => {
		if (auth?.userId && auth?.role === "Organization") router.push("/company")
		else if (auth?.userId && auth?.role === "Candidate")
			router.push("/candidate")
	}, []) //eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div className="w-full h-full flex flex-col overflow-hidden">
			<LandingNavbar />
			<SectionOne />
			<SectionTwo />
			<SectionThree />
			<Footer />
		</div>
	)
}

export default Landing
