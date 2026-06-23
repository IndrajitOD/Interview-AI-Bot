import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion, scale } from 'motion/react'
import { FaCheckCircle } from "react-icons/fa";
import { HiNoSymbol } from "react-icons/hi2";
import { Footer } from '../components/Footer';
import axios from 'axios'
import { BackendUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';



{/* <FaCheckCircle /> */}

const Pricing = () => {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free")
  const [loadingPlan, setLoadingPlan ] = useState(null)
  const dispatch = useDispatch()

  const plans = [
    {
      id: "1",
      name: "Beginer's Pack",
      price: "₹5",
      credits: "10",
      description: "Perfect for beginners starting interview prep.",
      features: [
        "100 AI Interview Credits",
        // "Basic Performance Report",
        // "Voice Interview Access",
        // "Limited History Tracking",
        "Value : 2.00 credits / ₹1",
      ],
      miss: [
        "No Bonus",
        "No Recurring Bonus",
      ],
      // default: true,
      // badge: ""
    },
    {
      id: "2",
      name: "Standard Pack",
      price: "₹10",
      credits: "50",
      description: "A quick, low-cost plan to get things done.",
      features: [
        "150 AI Interview Credits",
        // "Detailed Feedback",
        // "Performance Analytics",
        // "Full Interview History",
        "Value : 5.00 credits / ₹1",
      ],
      miss: [
        "No Bonus",
        "No Recurring Bonus",
      ],
    },
    {
      id: "3",
      name: "Budget Pack",
      price: "₹20",
      credits: "250",
      description: "The smart, wallet-friendly choice for casual users.",
      features: [
        "650 AI Interview Credits",
        // "Advanced AI Feedback",
        // "Skill Trend Analytics",
        // "Priority AI Processing",
        "Value : 12.50 credits / ₹1",
      ],
      miss: [
        "No Bonus",
        "No Recurring Bonus",
      ],
      
    },
    {
      id: "4",
      name: "Plus Pack",
      price: "₹30",
      credits: "500",
      description: "Step with more credits for less.",
      features: [
        "650 AI Interview Credits",
        // "Advanced AI Feedback",
        // "Skill Trend Analytics",
        // "Priority AI Processing",
        "Value : 16.66 credits / ₹1",
      ],
      miss: [
        "No Bonus",
        "No Recurring Bonus",
      ],
      badge: "Best Seller",
      
    },
    {
      id: "5",
      name: "Power Pack",
      price: "₹50",
      credits: "1000",
      description: "Unlocks serious usage without breaking the bank.",
      features: [
        "650 AI Interview Credits",
        // "Advanced AI Feedback",
        // "Skill Trend Analytics",
        // "Priority AI Processing",
        "Value : 20.00 credits / ₹1",
      ],
      miss: [
        "No Bonus",
        "No Recurring Bonus",
      ],
      
    },
    {
      id: "6",
      name: "Pro Pack",
      price: "₹100",
      credits: "5000",
      description: "Most popular for heavy everyday users.",
      features: [
        "5000 AI Interview Credits",
        // "Most popular for heavy everyday users",
        "Value : 50.00 credits / ₹1",
        "Recurring Bonus : +1000 Credits (for every fifth purchase)",
      ],
      miss: [
        "No Bonus",
      ],
      badge: "Highest Value",
    },
    {
      id: "7",
      name: "Elite Pack",
      price: "₹200",
      credits: "8000",
      description: "Includes extra bonus credits.",
      features: [
        "8000 AI Interview Credits",
        // "Includes extra bonus credits",
        "Value : 40.00 credits / ₹1",
        "Bonus : +4000 Credits",
        "Recurring Bonus : +3000 Credits (for every third purchase)",
      ],
      // badge: "Best Value",
    },
    {
      id: "8",
      name: "Master Pack",
      price: "₹300",
      credits: "12,000",
      description: "Maximum saving with a massive credit bonus.",
      features: [
        "12,000 AI Interview Credits",
        "Value : 40.00 credits / ₹1",
        "Bonus : +6000 Credits",
        "Recurring Bonus : +5000 Credits (for every alternative purchase)",
      ],
      badge: "Higest Bonus",
    },
  ]


  const handlePyment = async (plan) => {
    try {

      setLoadingPlan(plan.id)

      const amount = 
      plan.id === "1" ? 10 :
      plan.id === "2" ? 50 :
      plan.id === "3" ? 250 :
      plan.id === "4" ? 500 :
      plan.id === "5" ? 1000 :
      plan.id === "6" ? 5000 :
      plan.id === "7" ? 8000 :
      plan.id === "8" ? 12000 : 0;


      const result = await axios.post(BackendUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,

      }, {withCredentials: true})

      console.log(result.data)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "Interview AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler:async function (response) {
          // console.log(response)
          const verifypay = await axios.post(BackendUrl + "/api/payment/verify", 
            response , { withCredentials: true}
          )

          dispatch(setUserData(verifypay.data.user))

          alert("Conratulations !! Payment Sucessfull, Credits Sucessfully Added to your account.")

          navigate("/")
        },

        theme:{
          color:"#10b981"
        },
      }


      const rzp = new window.Razorpay(options)
      rzp.open()



    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className='min-h-screen py-16 px-6' style={{background:'linear-gradient(to bottom right, var(--color-bg), #EDE5F5)'}}>

      <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

        <button 
        onClick={() => navigate("/")}
        className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
          <FaArrowLeft className='text-gray-600' />
        </button>

        <div className='text-center w-full'>
          <h1 className='text-4xl font-bold' style={{color:'var(--color-text-dark)'}}>
            Choose Your Topup Plan
          </h1>
          <p className='text-gray-500 mt-3 text-lg'>
            Very cheap plans just for now.
          </p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div 
            key={plan.id}
            whileHover={!plan.default && {scale:1.03}}
            onClick={() => !plan.default && setSelectedPlan(plan.id)}
            className={`relative rounded-3xl p-8 transition-all duration-300 border 
              ${
                isSelected
                ? "shadow-2xl bg-white"
                : "border-gray-200 bg-white shadow-md"
              }
              ${plan.default ? "cursor-default" : "cursor-pointer"}`}
              style={isSelected ? {borderColor:'var(--color-coral)', borderWidth:'2px'} : {}}
            >
              {plan.badge && (
                <div className='absolute top-6 right-6 text-white text-xs p-1 px-2 rounded-full shadow' style={{backgroundColor:'var(--color-coral)'}}>
                  {plan.badge}
                </div>
              )}

              {/* {plan.default && (
                <div className='relative top-6 right-6 bg-gray-200 text-white text-xs py-1 rounded-full shadow'>
                  {plan.badge}
                </div>
              )} */}

              {plan.default && (
                <div className='absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full'>
                  Default
                </div>
              )}

              <h3 className='text-xl font-semibold text-gray-800'>
                {plan.name}
              </h3>

              <div className='mt-4'>
                <span className='text-3xl font-bold' style={{color:'var(--color-purple)'}}>
                  {plan.price}
                </span>

                <p className='text-gray-500 mt-1'>
                  {plan.credits} Credits
                </p>
              </div>

              <p className='text-gray-500 mt-4 text-sm leading-relaxed'>
                {plan.description}
              </p>

              <div className='mt-6 pt-3 space-y-3 text-left'>
                  {plan.features.map((features, i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <FaCheckCircle className='text-sm' style={{color:'var(--color-coral)'}}/>
                      <span className='text-gray-700 text-sm'>
                        {features}
                      </span>
                    </div>
                  ))}
                  {plan.miss?.map((miss, i) => (
                    <div key={i} className='flex items-center gap-3'>
                      <HiNoSymbol  className='text-red-500 text-sm'/>
                      <span className='text-gray-700 text-sm'>
                        {miss}
                      </span>
                    </div>
                  ))}
                </div>

                {!plan.default && 
                <button
                disabled={loadingPlan === plan.id}
                onClick={(e) => {e.stopPropagation()
                  if (!isSelected){
                    setSelectedPlan(plan.id)

                  }  else {
                    handlePyment(plan)
                  }
                }} 
                className={`w-full mt-8 py-3 rounded-xl font-semibold transition`}
                style={isSelected
                  ? {backgroundColor:'var(--color-purple)', color:'white'}
                  : {backgroundColor:'var(--color-bg)', color:'var(--color-purple)'}}>
                  {loadingPlan === plan.id
                  ? "payment Processing ..."
                  : isSelected
                    ? "Proceed to Pay"
                    :"Select Plan"}
                  {/* {isSelected ? "Proceed to Pay" : "Select Your Plan"} */}
                  </button>}

            </motion.div>
          )
        })}
      </div>
      <Footer />
    </div>
    
  )
}

export default Pricing