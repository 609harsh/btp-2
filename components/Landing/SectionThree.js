import React from "react"
import { Card } from "./Card"

const SectionThree = () => {
  return (
    <div className="w-screen h-full flex flex-col justify-start items-start px-32 md:px-8 mt-16 mb-16">
      <h1 className="heading-2">Our Services</h1>
      <span className="mt-4 text-center description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </span>
      <div className="grid grid-cols-3 md:grid-cols-1">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default SectionThree
