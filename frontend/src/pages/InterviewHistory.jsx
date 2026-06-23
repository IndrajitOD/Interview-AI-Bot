import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackendUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'

const InterviewHistory = () => {

    const [interviews,setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyIntereviews = async () => {
            try {
                const result = await axios.get(BackendUrl+"/api/interview/get-interview", {withCredentials: true})
                setInterviews(result.data)
                console.log(result.data)


            } catch (error) {
                console.log(error)
            }
        }

        getMyIntereviews()
    }, [])




  return (
    <div className='min-h-screen py-10' style={{background:'linear-gradient(to bottom right, var(--color-bg), #EDE5F5)'}}>

        <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto' >
            <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>

                <button 
                onClick = {() => navigate("/")}
                className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
                    <FaArrowLeft className='text-gray-600'/>
                </button>

                <div className=''>
                    <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
                        Interview History
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        Track your past Interviews and Performance Reports here.
                    </p>

                </div>
            </div>

            {interviews.length === 0 ?

            <div className='bg-white p-10 rounded-2xl shadow text-center'>
              <p>No Interviews found. Check your Interview Skills from your interview report.</p>
            </div>
            :

            <div className='grid gap-3'>
                {interviews.map((item,index) => (
                    <div key={index}
                    onClick={() => navigate(`/report/${item._id}`)}
                    className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100'>

                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                            <div className=''>

                                <h3 className='text-lg font-semibold  text-gray-800'>
                                    {item.role}
                                </h3>

                                <p className='text-gray-500 text-sm mt-1'>
                                    {item.experience} {item.mode}
                                </p>

                                <p className='text-xs text-gray-400 mt-2'>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className='text-right'>
                                <p className='text-xl font-bold' style={{color:'var(--color-purple)'}}>
                                    {item.finalScore || 0}/10
                                </p>

                                <p className='text-xs text-gray-400'>
                                    Overall Score
                                </p>
                            </div>

                            <span className={`px-4 py-1 rounded-full text-xs font-medium`} style={item.status === "completed"
                                ? {backgroundColor:'var(--color-amber-light)', color:'var(--color-purple)'}
                                : {backgroundColor:'#fef9c3', color:'#92400e'}}>
                                {item.status}
                            </span>

                        </div>
                    </div>
                ))}
            </div>}


        </div>
    </div>
  )
}

export default InterviewHistory