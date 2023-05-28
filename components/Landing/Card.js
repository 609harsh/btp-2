import Image from 'next/image'
import React from 'react'
import Robot from '../../assets/robot.png'

export const Card = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-4 mt-16 shadow-2xl drop-shadow-2xl rounded-lg p-8 border-white border">
      <div className="rounded border-2 border-color2">
      <Image
        src={Robot}
        alt="Robot"
        />
      </div>
      <span className="sub-heading mt-4">Make Hiring Faster</span>
      <span className="sub-description mt-4 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </span>
    </div>
  )
}
