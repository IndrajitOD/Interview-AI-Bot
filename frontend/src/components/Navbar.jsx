import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { BackendUrl } from '../App'
import { RiRobot2Line } from "react-icons/ri";
import { FaCoins } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { AuthModal } from './AuthModal'


{/* <RiRobot2Line /> <FaCoins /><BiLogOut /><FaUser /> */ }

const Navbar = () => {



    const { userData } = useSelector((state) => state.user)

    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const logout = async () => {
        try {
            await axios.post(BackendUrl + "/api/auth/logout",
                { withCredentials: true }
            )
            console.log("Current User just logged out successfully")
            dispatch(setUserData(null))
            setShowUserPopup(false)
            setShowCreditPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex justify-center px-4 pt-6' style={{backgroundColor:'var(--color-bg)'}}>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-purple-100 px-8 py-4 flex justify-between items-center relative'>

                <div className='flex items-center gap-3 cursor-pointer'>
                    <div style={{backgroundColor:'var(--color-purple)'}} className='text-white p-2 rounded-lg'>
                        <RiRobot2Line size={18} />
                    </div>
                    <h1 className='font-semibold hidden md:block text-lg'>Interview AI</h1>

                </div>

                <div className='flex items-center gap-6 relative'>
                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) {
                                setShowAuth(true)
                                return;
                            }
                            setShowCreditPopup(!showCreditPopup);
                            setShowUserPopup(false)
                        }}
                            className='flex items-center gap-2 px-4 py-2 rounded-full text-md transition' style={{backgroundColor:'var(--color-amber-light)', color:'var(--color-text-dark)'}}>
                            <FaCoins size={20} />
                            {userData?.credits || 0}
                        </button>

                        {showCreditPopup && (
                            <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                                <p className='flex justify-center text-sm text-gray-600 mb-4'>You can buy more credits.</p>
                                <button onClick={() => navigate("/pricing")} className='w-full text-white py-2 rounded-lg text-sm' style={{backgroundColor:'var(--color-purple)'}}>Buy more credits</button>

                            </div>
                        )}

                    </div>

                    <div className='relative'>
                        <button onClick={() => {
                            if (!userData) {
                                setShowAuth(true)
                                return;
                            }
                            setShowUserPopup(!showUserPopup);
                            setShowCreditPopup(false)
                        }} className='w-9 h-9 text-white rounded-full flex items-center justify-center font-semibold' style={{backgroundColor:'var(--color-purple)'}}>
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUser size={16} />}
                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                                <p className='text-md font-medium mb-1' style={{color:'var(--color-coral)'}}>
                                    {userData?.name}
                                </p>

                                <button onClick={() => navigate("/history")}
                                    className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>
                                    Interview History
                                </button>

                                <button onClick={logout} className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
                                    <BiLogOut size={16} />
                                    Logout
                                </button>

                            </div>
                        )}


                    </div>

                </div>



            </motion.div>

            {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

        </div>
    )
}

export default Navbar