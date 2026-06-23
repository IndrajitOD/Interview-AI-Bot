import React from 'react'
import { motion } from 'motion/react'
import { FaUserTie } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { FaArrowLeft, FaMicrophone } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios'
import { BackendUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'


{/* <FaUserTie /> 
  <FaBriefcase />
  <MdFileUpload />
  <FaMicrophone />
  <FaChartLine /> */}


const Step1Setup = ({ onStart }) => {

  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [role, setRole] = useState("")
  const [experience, setExperience] = useState("")
  const [mode, setMode] = useState("Technical")

  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState("")
  const [analysisDone, setAnalysisDone] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const navigate = useNavigate()
  




  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true)

    const formdata = new FormData()
    formdata.append("resume", resumeFile)

    try {
      const result = await axios.post(BackendUrl + "/api/interview/resume", formdata, { withCredentials: true })

      console.log(result.data)

      setRole(result.data.role || "")
      setExperience(result.data.experience || "")
      setProjects(result.data.projects || [])
      setSkills(result.data.skills || [])
      setResumeText(result.data.resumeText || "")
      setAnalysisDone(true);
      setAnalyzing(false)

    } catch (error) {
      console.log(error)
      setAnalyzing(false)
    }

  }



  const handleStart = async () => {
    setLoading(true)
    try {
      const result = await axios.post(BackendUrl + "/api/interview/generate-questions", { role, experience, mode, resumeText, projects, skills }, { withCredentials: true })
      console.log(result.data)

      if (userData) {
        dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
      }

      setLoading(false)
      onStart(result.data)


    } catch (error) {
      console.log(error.response?.data || error)
      setLoading(false)
    }
  }


  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen flex items-center justify-center px-4' style={{background:'linear-gradient(to bottom right, var(--color-bg), #EDE5F5)'}}>

      <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='relative p-12 flex flex-col justify-center' style={{background:'linear-gradient(to bottom right, var(--color-purple), var(--color-purple-light))'}}>

            <div>
              <button 
                onClick={() => navigate("/")}
                className='mt-2 p-3 mb-6 rounded-full bg-white   shadhover:shadow-md transition '>
                  <FaArrowLeft className='text-gray-600' />
              </button>
            </div>

          <h2 className='text-4xl font-bold mb-6' style={{color:'var(--color-white)'}}>
            Start Your AI Interview
          </h2>

          <p className='mb-10' style={{color:'var(--color-amber-light)'}}>
            Practice real interview scenarios powered by AI.
            Improve communication, technical skills, and confidence.
          </p>

          <div className='space-y-5'>
            {
              [
                {
                  icon: <FaUserTie style={{color:'var(--color-amber)'}} className='text-xl' />,
                  text: "Choose Role & Experience",
                },
                {
                  icon: <FaMicrophone style={{color:'var(--color-amber)'}} className='text-xl' />,
                  text: "Smart Voice Interview",
                },
                {
                  icon: <FaChartLine style={{color:'var(--color-amber)'}} className='text-xl' />,
                  text: "Performance Analytics",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className='flex items-center space-x-4 p-4 rounded-xl shadow-sm cursor-pointer' style={{backgroundColor:'rgba(255,255,255,0.15)', color:'var(--color-white)'}}>
                  {item.icon}
                  <span className='font-medium' style={{color:'var(--color-white)'}}>
                    {item.text}
                  </span>
                </motion.div>
              ))
            }
          </div>

        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className='p-12 bg-white'>

          <h2 className='text-3xl font-bold text-gray-800 mb-8'>
            Interview SetUp
          </h2>

          <div className='space-y-6'>
            <div className='relative'>

              <FaUserTie className='absolute top-4 left-4 text-gray-400' />

              <input type='text' placeholder='Enter Your Role'
                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
                onChange={(e) => setRole(e.target.value)} value={role} />

            </div>
            <div className='relative'>

              <FaBriefcase className='absolute top-4 left-4 text-gray-400' />

              <input type='text' placeholder='Experience (e.g. 2 years)'
                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
                onChange={(e) => setExperience(e.target.value)} value={experience} />



            </div>

            <select value={mode}
              onChange={(e) => setMode(e.target.value)}
              className='w-full py-3 px-4 border border-gray-200 rounded-xl focus:border-[var(--color-purple)] outline-none transition'>

              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>

            </select>

            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className='border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition' style={{borderColor:'var(--color-purple-light)','--hover-bg':'var(--color-amber-light)'}}>

                <MdFileUpload className='text-4xl mx-auto mb-3' style={{color:'var(--color-coral)'}} />

                <input type="file"
                  accept='application/pdf'
                  id='resumeUpload'
                  className='hidden'
                  onChange={(e) => setResumeFile(e.target.files[0])} />

                <p className='text-gray-600 font-medium'>
                  {resumeFile ? resumeFile.name : "Click to upload resume file (optional)."}
                </p>

                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => { e.stopPropagation(); handleUploadResume() }}
                    className='mt-4 text-white px-5 py-2 rounded-lg transition' style={{backgroundColor:'var(--color-purple)'}}>
                    {analyzing ? "Analyzing... " : "Analyze Resume"}


                  </motion.button>
                )}

              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4'>

                <h3 className='text-lg font-semibold text-gray-800'>
                  Resume Analysis Result
                </h3>

                {projects.length > 0 && (
                  <div>

                    <p className='font-medium text-gray-700 mb-1'>
                      Projects :
                    </p>

                    <ul className='list-disc list-inside text-gray-600 space-y-1'>
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>

                  </div>
                )}


                {skills.length > 0 && (
                  <div>

                    <p className='font-medium text-gray-700 mb-1'>
                      Skills :
                    </p>

                    <div className='flex flex-wrap gap-2'>
                      {skills.map((s, j) => (
                        <span
                          className='font-bold text-sm' style={{color:'var(--color-coral)'}}
                          key={j}>
                          {s},
                        </span>
                      ))}
                    </div>

                  </div>
                )}

              </motion.div>
            )}

            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              // onClick={() => onStart({ role, experience, mode, projects, skills, resumeText })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className='w-full disabled:bg-gray-300 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md' style={{backgroundColor:'var(--color-purple)'}}>
              {loading ? "Starting Interview . . ." : "Click to Start Interview"}
            </motion.button>

          </div>

        </motion.div>

      </div>

    </motion.div>
  )
}

export default Step1Setup