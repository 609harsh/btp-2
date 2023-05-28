import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Dashboard from "../../components/Company/Dashboard"
import Navbar from "../../components/Company/Navbar"
import { companyTabs } from "../../data"
import { getActiveAssessments, getCompanyDetail, getDisabledAssessments } from "../../redux/actions/company.actions"
// import Navbar from '../../components/company/navbar/Navbar'
const Index = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const organizationId = useSelector((state) => state?.companyReducer?.details?.organizationId);
  const loading = useSelector((state) => state?.companyReducer?.loading)
  const [activeTab , setActiveTab] = useState(companyTabs[0].id);


  const getDetails = async () => {
    await dispatch(getCompanyDetail());
  }

  useEffect(() => {
    dispatch(getActiveAssessments({
      organizationId:organizationId
    }));
    dispatch(getDisabledAssessments({
      organizationId:organizationId
    }));
  },[organizationId])

  useEffect(() => {
    getDetails()  
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      {
        !loading && 
        <>
          {/* <Navbar/> */}
          <Navbar show={true} activeTab={activeTab} setActiveTab={setActiveTab}/>
          {
            activeTab === 'dashboard' && <Dashboard />
          }
        </>
      }

    </div>
  )
}

export default Index

