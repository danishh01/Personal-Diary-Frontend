import React, { useEffect, useState } from "react"
import PasswordInput from "../../components/PasswordInput"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { validateEmail } from "../../utils/helper"
import { useDispatch, useSelector } from "react-redux"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { loading, currentUser } = useSelector((state) => state.user)

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter your name.")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter your password.")
      return
    }

    setError(null)

    // SignUp API call
    try {
      const response = await axiosInstance.post("/auth/signup", {
        username: name,
        email,
        password,
      })

      // handle successful sign-up response
      if (response.data) {
        navigate("/login")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    }
  }

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/")
    }
  }, [currentUser])

  return (
    <div className="min-h-screen bg-cyan-50 overflow-hidden relative">
  <div className="login-ui-box right-10 -top-40 absolute z-0" />

  <div className="container min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 md:px-10 lg:px-20 mx-auto gap-10 relative z-10">
    <div className="w-full lg:w-1/2 h-64 md:h-96 lg:h-[90vh] flex items-end bg-[url(/coverphoto.JPG)] bg-cover bg-center rounded-lg p-6 md:p-10 ">
      <div>
        <h4 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-snug md:leading-[50px] lg:leading-[58px]">
          Create Your <br /> Travel Stories
        </h4>
        <p className="text-sm md:text-base text-white leading-6 pr-2 md:pr-7 mt-4">
          Record your travel experiences and memories in your travel journey
        </p>
      </div>
    </div>

    <div className="w-full lg:w-1/2 bg-white rounded-lg relative p-6 md:p-10 shadow-lg shadow-cyan-200/20">
      <form onSubmit={handleSignUp}>
        <h4 className="text-xl md:text-2xl font-semibold mb-6">Create Your Account</h4>

        <input
          type="text"
          placeholder="Enter Your Name"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

        {loading ? (
          <p className="animate-pulse w-full text-center btn-primary">
            LOADING...
          </p>
        ) : (
          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
        )}

        <p className="text-xs text-slate-500 text-center my-4">Or</p>

        <button
          type="button"
          className="btn-primary btn-light"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </button>
      </form>
    </div>
  </div>
</div>

  )
}

export default SignUp
