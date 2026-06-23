import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { AiOutlineRobot } from "react-icons/ai";
import { BsMic } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { IoBarChartOutline } from "react-icons/io5";
import { BsFileEarmarkText } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthModal } from '../components/AuthModal';

import { Footer } from '../components/Footer';

import aians from '../assets/ai-ans.png'
import confi from '../assets/confi.png'
import credit from '../assets/credit.png'
import history from '../assets/history.png'
import hr from '../assets/HR.png'

import img1 from '../assets/img1.png'
import mm from '../assets/MM.png'
import pdf from '../assets/pdf.png'
import resume from '../assets/resume.png'
import tech from '../assets/tech.png'

// import {
{/* <AiOutlineRobot />
<BsMic />
<FaRegClock />
<IoBarChartOutline />
<BsFileEarmarkText />
<HiSparkles /> */}

// }

export const Home = () => {
  const [showAuth, setShowAuth] = useState(false);
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()


  return (
    <div className='min-h-screen flex flex-col' style={{backgroundColor:'var(--color-bg)'}}>
      <Navbar />

      <div className='flex-1 px-6 py-20'>

        <div className='max-w-6xl mx-auto'>

        <div className='flex justify-center mb-6'>
          <div className='text-sm px-4 py-2 rounded-full flex items-center gap-2' style={{backgroundColor:'var(--color-amber-light)', color:'var(--color-purple)'}}>
            <HiSparkles size={16} style={{color:'var(--color-coral)'}} />
            AI Powered Smart Interview Platform
          </div>


        </div>

        <div className='text-center mb-28'>
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto' style={{color:'var(--color-text-dark)'}}>
            Practice Interviews with
            <span className='relative inline-block'>
              <span className='px-5 py-1 rounded-full' style={{backgroundColor:'var(--color-amber-light)', color:'var(--color-purple)'}}>
                AI Intelligence
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='text-gray-500 mt-6 max-w-2xl mx-auto text-lg'>
            Role-based mock interview with smart follow-ups, adaptive difficulty and real-time performance evaluation.

          </motion.p>

          <div className='flex flex-wrap justify-center gap-4 mt-10'>
            <motion.button onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return;
              }
              navigate("/interview")

            }}
              whileHover={{ opacity: 0.9, scale: 1.05 }}
              whileTap={{ opacity: 1, scale: 0.73 }}
              className='text-white px-10 py-3 rounded-full transition shadow-md' style={{backgroundColor:'var(--color-purple)'}}>
              Start Interview
            </motion.button>

            <motion.button onClick={() => {
              if (!userData) {
                setShowAuth(true)
                return;
              }
              navigate("/history")

            }}
              whileHover={{ opacity: 0.9, scale: 1.05 }}
              whileTap={{ opacity: 1, scale: 0.73 }}
              className='font-semibold border px-10 py-3 rounded-full transition' style={{borderColor:'var(--color-purple)', color:'var(--color-purple)'}}>
              Your History
            </motion.button>

          </div>

        </div>

        <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-28'>
          {
            [
              {
                icon: <AiOutlineRobot />,
                step: "STEP 1",
                title: "Role & Experience Selection",
                desc: "AI adjusts difficulty based on selected job role."
              },
              {
                icon: <BsMic />,
                step: "STEP 2",
                title: "Smart Voice Interview",
                desc: "Dynamic follow-up questions based on your answers."
              },
              {
                icon: <FaRegClock />,
                step: "STEP 3",
                title: "Timer Based Simulation",
                desc: "Real interview pressure with time tracking."
              }
            ].map((items, index) => (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + index * 0.2 }}
                whileHover={{ rotate: 0, scale: 1.06 }}

                key={index} className={`
                relative bg-white rounded-3xl p-10 w-80 max-w-[90%] shadow-md hover:shadow-2xl
                transition-all duration-300 border-2 hover:border-[#E8706A]
                ${index === 0 ? "rotate-[4deg] border-purple-100" : ""}
                ${index === 1 ? "rotate-[-3deg] md:-mt-6 shadow-xl border-purple-100" : ""}
                ${index === 2 ? "rotate-[3deg] border-purple-100" : ""}
                `}>

                <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-white' style={{backgroundColor:'var(--color-coral)', border:'2px solid var(--color-coral)'}}>
                  {items.icon}
                </div>

                <div className='pt-10 text-center'>

                  <div className='text-xs font-semibold mb-2 tracking-wider' style={{color:'var(--color-coral)'}}>{items.step}</div>
                  <h3 className='font-semibold mb-3 text-lg'>{items.title}</h3>
                  <p className='text-sm text-gray-500 leading-relaxed'>{items.desc}</p>

                </div>

              </motion.div>
            ))
          }
        </div>

        <div className='mb-32'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-4xl font-semibold text-center mb-16'>

            Advanced AI{" "}
            <span style={{color:'var(--color-coral)'}}>
              Capabilities
            </span>

          </motion.h2>

          <div className='grid md:grid-cols-2 gap-10'>
            {
              [
                {
                  image: aians,
                  icon: <IoBarChartOutline size={20} />,
                  title: "AI Answers Evaluation",
                  desc: "Scores communication, techinal accuracy and confidence."
                },
                {
                  image: resume,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume Based Interview",
                  desc: "Project-specific questions based on resume."
                },
                {
                  image: pdf,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Downloadable PDF Report",
                  desc: "Detailed strengths, weaknesses and improvement insights."
                },
                {
                  image: aians,
                  icon: <IoBarChartOutline size={20} />,
                  title: "History & Analytics",
                  desc: "Track progress with performance graph and topic analysis."
                },
              ].map((items, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className='bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl transition-all'>

                  <div className='flex flex-col md:flex-row items-center gap-8'>

                    <div className='w-full md:w-1/2 flex justify-center'>
                      <img src={items.image} alt={items.title}
                        className='w-full h-auto object-contain max-h-64' />
                    </div>

                    <div className='w-full md:w-1/2'>
                      <div className='w-12 h-1 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0' style={{backgroundColor:'var(--color-amber-light)', color:'var(--color-purple)'}}>{items.icon}</div>

                      <h3 className='font-semibold mb-3 text-xl text-center md:text-left'>{items.title}</h3>

                      <p className='text-gray-500 text-sm leading-relaxed text-center md:text-left'>{items.desc}</p>
                    </div>

                  </div>


                </motion.div>
              ))
            }
          </div>


        </div>

        <div className='mb-32'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-4xl font-semibold text-center mb-16'>

            Multiple Interview{" "}
            <span style={{color:'var(--color-coral)'}}>
              Modes
            </span>

          </motion.h2>

          <div className='grid md:grid-cols-2 gap-10'>
            {
              [
                {
                  image1: hr,
                  title1: "HR Interview Mode",
                  desc: "Behavioral and communication based evaluation."
                },
                {
                  image1: tech,
                  title1: "Technical Mode",
                  desc: "Deep technical questioning based on selected role."
                },
                {
                  image1: confi,
                  title1: "Confidence Detection",
                  desc: "Basic tone and voice analysis insights."
                },
                {
                  image1: credit,
                  title1: "Credits Systems",
                  desc: "Unlock Premium interview sessions easily."
                },
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all'>

                  <div className='flex items-center justify-between gap-6'>

                    <div className='w-1/2'>
                      <h3 className='font-semibold text-xl mb-3'>
                        {mode.title1}
                      </h3>

                      <p className='text-gray-500 text-sm leading-relaxed'>
                        {mode.desc}
                      </p>
                    </div>

                    <div className='w-1/2 flex justify-end'>
                      <img 
                        src={mode.image1}
                        alt={mode.title1}
                        className='w-28 h-28 object-contain'
                      />
                    </div>

                    {/* <div className='w-full md:w-1/2 flex justify-center'>
                      <img src={items.image1} alt={items.title1}
                        className='w-full h-auto object-contain max-h-64' />
                    </div>

                    <div className='w-full md:w-1/2'>
                      <div className='w-12 h-1 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0' style={{backgroundColor:'var(--color-amber-light)', color:'var(--color-purple)'}}>{items.icon}</div>

                      <h3 className='font-semibold mb-3 text-xl text-center md:text-left'>{items.title1}</h3>

                      <p className='text-gray-500 text-sm leading-relaxed text-center md:text-left'>{items.desc}</p>
                    </div> */}

                  </div>


                </motion.div>
              ))
            }
          </div>


        </div>

      </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

        <Footer />

    </div>
  )
}
