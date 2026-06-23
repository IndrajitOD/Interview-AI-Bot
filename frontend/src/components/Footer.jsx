import React from 'react'
import { BsRobot } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className='flex justify-center px-4 pb-10 py-4 pt-10' style={{backgroundColor:'var(--color-bg)'}}>

      <div className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 py-8 px-3 text-center'>

        <div className='flex col-3 justify-center items-center gap-3 mb-3'>

          <div className='text-white p-2 rounded-lg' style={{backgroundColor:'var(--color-purple)'}}>
            <BsRobot size={16}/>
          </div>

          <h2 className='font-semibold'>Interview AI</h2>

          <p className='text-gray-600 text-sm max-w-xl mx-auto'>Hi my name is <span className='font-bold'>Indrajit Bhowmick</span>, I have created this project as an AI powered interview platform design to improve skill like communication, techinal, and professional, and provide a confidence and depth in the designated role.</p>

        </div>
      </div>
    </div>
  )
}
