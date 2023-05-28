import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { EmailInput, PasswordInput } from "./signin-inputs"
import { loginWithEmailPassword } from "../../redux/actions/auth.actions"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import useAuth from "../../hooks/useAuth"

export function SignInBlock() {
  const { error } = useSelector((state) => state.authReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onLogin = (e) => {
    e.preventDefault()
    dispatch(loginWithEmailPassword({ email, password }))
  }

  // ACCESS CONTROL
  const auth = useAuth()
  useEffect(() => {
    if (auth) {
      const { userId, role } = auth
      if (userId && role === "Candidate") router.push("/candidate")
      else if (userId && role === "Organization") router.push("/company")
    }
  }, [auth])

  return (
    <div
      className="
      p-8 2xl:p-4 
      w-[40%] 2xl:w-[35%] xl:w-[22rem] h-fit
    rounded-md shadow-lg  border-t-4 border-color2-tint"
    >
      <ToastContainer />
      <div className="flex flex-col gap-4 2xl:gap-0 text-center">
        <h1 className="text-6xl 2xl:text-4xl 2sm:text-3xl font-bold mb-0">
          welcome back !
        </h1>
        <p className="text-3xl 2xl:text-lg 2sm:text-base text-gray-500 mb-0">
          sign in to continue
        </p>
      </div>
      <form onSubmit={onLogin}>
        <div className="flex flex-col my-8 gap-8 2xl:gap-6">
          <EmailInput
            value={email}
            error={error.message?.toLowerCase() === "no user found"}
            setValue={setEmail}
          />
          <PasswordInput
            value={password}
            error={error.message?.toLowerCase() === "wrong password"}
            setValue={setPassword}
          />
        </div>
        <div className="w-full my-4 text-right">
          <a
            href="#"
            className="text-2xl 2xl:text-lg 2sm:text-base text-color2"
          >
            forgot password ?
          </a>
        </div>
        <SiginBtn />
      </form>
      <SigupBtn router={router} />
    </div>
  )
}

function SiginBtn({ router, onLogin }) {
  return (
    <button
      onClick={onLogin}
      className="w-[100%] my-4 btn-primary text-3xl hover:scale-100"
    >
      Sign In
    </button>
  )
}

function SigupBtn({ router }) {
  return (
    <button
      className="w-[100%] mt-8 btn-secondary text-3xl hover:scale-100"
      onClick={() => router.push("/auth/signup")}
    >
      Sign Up
    </button>
  )
}
