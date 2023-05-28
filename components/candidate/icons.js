const navStyle_lg = `w-[1.5rem] h-[1.5rem] 2xl:w-[1.25rem] 2xl:h-[1.25rem]`
const navStyle_md = `w-[1.25rem] h-[1.25rem] 2xl:w-[1rem] 2xl:h-[1rem]`

export const MenuRightIcon = () => {
  return (
    <svg
      className={`w-[1.75rem] h-[1.75rem]`}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
        fillRule="nonzero"
      />
    </svg>
  )
}
export const CalenderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${navStyle_lg}`}
      viewBox="0 0 24 24"
    >
      <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
    </svg>
  )
}
export const TickIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${navStyle_lg}`}
      viewBox="0 0 24 24"
    >
      <path d="M21.855 10.303c.086.554.145 1.118.145 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.348 0 4.518.741 6.304 1.993l-1.421 1.457c-1.408-.913-3.083-1.45-4.883-1.45-4.963 0-9 4.038-9 9s4.037 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.865-1.902zm-.951-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z" />
    </svg>
  )
}
export const CheckMarkIcon = () => {
  return (
    <svg
      className={`${navStyle_lg}`}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-12.751 8.306c-.165-.147-.249-.351-.249-.556 0-.411.333-.746.748-.746.178 0 .355.062.499.19l2.371 2.011 4.453-4.962c.149-.161.35-.243.554-.243.417 0 .748.336.748.746 0 .179-.065.359-.196.503l-4.953 5.508c-.148.161-.35.243-.553.243-.177 0-.356-.063-.498-.19z"
        fillRule="nonzero"
      />
    </svg>
  )
}
export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${navStyle_lg}`}
      viewBox="0 0 24 24"
    >
      <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
    </svg>
  )
}
export const CrossIcon = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${size === "md" ? navStyle_md : navStyle_lg}`}
      viewBox="0 0 24 24"
    >
      <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
    </svg>
  )
}
export const LogoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${navStyle_lg}`}
      viewBox="0 0 24 24"
    >
      <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" />
    </svg>
  )
}
