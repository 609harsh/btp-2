import { SignInBlock } from "../../components/signin_up/SigninBlock"
import wave1 from "../../assets/signin_up/login_wave1.png"
import loginimg1 from "../../assets/signin_up/login_img1.png"
import SigninNavbar from "../../components/signin_up/SigninNavbar"
import LoadingModal from "../../components/Loaders/LoadingModal"
import { useSelector } from "react-redux"

export default function Signin() {
  const {signinLoading} = useSelector(state=>state.authReducer)

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {signinLoading && <LoadingModal />}
      <SigninNavbar />
      <div
        className="absolute z-[3] inset-0 m-auto flex flex-wrap
      items-center justify-center gap-[10%] md:gap-4  
      mx-[10rem] xl:mx-[5rem] lg:mx-2"
      >
        <img
          className="w-[40%] lg:w-[20rem] md:hidden h-auto object-cover"
          src={loginimg1.src}
          alt="limg1"
        />
        <SignInBlock />
      </div>

      <div className="absolute bottom-0">
        <img src={wave1.src} alt="wave1" />
      </div>
    </div>
  )
}
