import React from 'react'
import CreateInterviewSet from '../../../components/Company/CreateInterviewSet';
import Navbar from '../../../components/Company/Navbar';

const Create = () => {

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar show={false}/>
      <CreateInterviewSet/>
    </div>
  )
} 

export default Create