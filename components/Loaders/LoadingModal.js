import React from 'react'
import {Spin} from 'antd'
export default function LoadingModal() {
  return (
    <div className='fixed z-[999] w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,.35)]'><Spin size='large' /></div>
  )
}
