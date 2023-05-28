import "../styles/globals.css"
import store from "../redux/store"
import { Provider } from "react-redux"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import Router from "next/router" 
import "antd/dist/antd.css"
import React, { useEffect, useState } from "react"
import {CustomToastContainer} from "../components/customToast"
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
})

//create useeffect -- check if auth exist -- if yes then render component else route to 404 page

Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const Layout = Component?.Layout ? Component.Layout : React.Fragment

  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  return (
		<>
			<Provider store={store}>
				<Layout>
					<CustomToastContainer />
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	)
}

export default MyApp
