import React from 'react'

const useAuth = () => {
  const hasWindow = typeof window !== 'undefined';
  const auth = hasWindow && JSON.parse(window.localStorage.getItem("auth"))
  return auth;
}

export default useAuth