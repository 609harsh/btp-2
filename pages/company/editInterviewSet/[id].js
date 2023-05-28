import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EditInterviewSetComponent from '../../../components/Company/EditInterviewSetComponent';
import Navbar from '../../../components/Company/Navbar';
import { getEditAssessmentDetails } from '../../../redux/actions/company.actions';

const EditInterviewSet = () => {

  const router = useRouter();
  const id = router.query.id;
  const loading = useSelector((state) => state?.companyReducer?.loading);
  const dispatch = useDispatch();

  const getDetails = async () => {
    await dispatch(getEditAssessmentDetails({
      assessmentId:id
    }));
  }

  useEffect(() => {
  if(id)
    {
      getDetails();
    }
  },[id])






  return (
    <div className="w-full h-full flex flex-col">
      {
        !loading && 
        <>
          <Navbar show={false}/>
          <EditInterviewSetComponent/>
        </>
      }
      
    </div>
  )
} 

export default EditInterviewSet