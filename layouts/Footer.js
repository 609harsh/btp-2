import Image from 'next/image'
import React from 'react'
import Logo from '../assets/logo.png'
import useWindowDimensions from '../hooks/useWindowDimensions ';

const Footer = () => {
   const { height, width } = useWindowDimensions();
  return (
    <div className='bg-color1-tint px-16 py-8 flex flex-col'>
      <div>
      <Image
        src={Logo}
        alt="Logo"
        // width={10}
        width={width < 600 ? 105 : 225}
        height={ width < 600 ? 35 : 75}
      />
      </div>
      <span className="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</span>
      <span className="mt-8">© Terms & Conditions</span>
      <span>Privacy Policy</span>
    </div>
  )
}

export default Footer