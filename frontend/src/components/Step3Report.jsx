import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { current } from '@reduxjs/toolkit';

export const Step3Report = ({ report }) => {

  if (!report) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-500 text-lg'>Loading your report ..... </p>
      </div>
    )
  }

  const navigate = useNavigate()

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
    userName = "Candidate",
    role = "Not specified",
    mode = "Not specified"
  } = report

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const Skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ]

  let performanceText = ""
  let shortTagline = ""

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities."
    shortTagline = "Excellent clarity and structured response."
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews."
    shortTagline = "Good foundation, refine articulation."
  } else {
    performanceText = "Significant improvement required."
    shortTagline = "Work on clarity and confidence."
  }

  const score = finalScore
  const percentage = (score / 10) * 100

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4")

    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    let currentY = 25

    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.setTextColor(61, 43, 94) // Purple
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center"
    })

    currentY += 5

    doc.setDrawColor(232, 112, 106) // Coral
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2)

    currentY += 15

    // Candidate Details box
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, currentY, contentWidth, 30, 3, 3, "FD") // Increased height to 30
    
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(31, 41, 55)
    doc.text("Candidate Details", margin + 6, currentY + 8)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.text(`Name: ${userName}`, margin + 6, currentY + 15) // Adjust spacing
    doc.text(`Role: ${role}`, margin + 6, currentY + 21) // Adjust spacing
    
    const domainText = mode === "Tech" ? "Technical" : (mode === "HR" ? "Non-Technical (HR)" : mode)
    doc.text(`Domain: ${domainText}`, margin + 6, currentY + 27) // Adjust spacing

    currentY += 38

    doc.setFillColor(245, 200, 66) // Amber
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F")

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth / 2,
      currentY + 12,
      { align: "center" }
    )

    currentY += 30

    doc.setFillColor(249, 250, 251)
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F")

    doc.setFontSize(12)

    doc.text(`Confidence: ${confidence}/10`, margin + 10, currentY + 10)
    doc.text(`Communication: ${communication}/10`, margin + 10, currentY + 18)
    doc.text(`Correctness: ${correctness}/10`, margin + 10, currentY + 26)

    currentY += 45

    let advice = ""

    if (finalScore >= 8) {
      advice = "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples."
    } else if (finalScore >= 5) {
      advice = "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples."
    } else {
      advice = "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly."
    }

    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(220)
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4)

    doc.setFont("helvetica", "bold")
    doc.text("Professional Advice", margin + 10, currentY + 10)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20)
    doc.text(splitAdvice, margin + 10, currentY + 20)

    currentY += 50

     

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["S.No", "Interview Details", "Score"]],
      body: questionWiseScore.flatMap((q, i) => {
        const hasReply = q.reply?.trim()
        const rowSpan = hasReply ? 4 : 3

        return [
          // Row 1: Question
          [
            { content: `${i + 1}`, rowSpan, styles: { valign: "middle", halign: "center", fontStyle: "bold", textColor: [61, 43, 94] } }, // Purple
            { content: `Question:\n${q.question || "N/A"}`, styles: { fontStyle: "bold", textColor: [31, 41, 55] } },
            { content: `${q.score ?? 0}/10`, rowSpan, styles: { valign: "middle", halign: "center", fontStyle: "bold", textColor: [61, 43, 94] } }, // Purple
          ],
          // Row 2: Answer
          [
            { content: `Answer:\n${q.answer?.trim() ? q.answer.trim() : "No answer was submitted."}`, styles: { fontStyle: "normal", textColor: [55, 65, 81] } },
          ],
          // Row 3: AI Feedback
          [
            { content: `AI Feedback:\n${q.feedback?.trim() ? q.feedback.trim() : "No feedback available."}`, styles: { fontStyle: "italic", textColor: [61, 43, 94], fillColor: [245, 240, 248] } }, // Purple text, off-white bg
          ],
          // Row 4: Reply (only if present)
          ...(hasReply
            ? [[
                { content: `Reply:\n${q.reply.trim()}`, styles: { fontStyle: "normal", textColor: [55, 65, 81] } },
              ]]
            : []),
        ]
      }),

      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },
      headStyles: {
        fillColor: [61, 43, 94], // Purple
        textColor: 255,
        halign: "center",
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 14, halign: "center" },
        1: { cellWidth: "auto" },
        2: { cellWidth: 22, halign: "center" },
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
    })

    // Position it correctly right after the table ends
    currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : currentY) + 15

    // Bottom Thank You box
    const thankYouText = "Thank You for using Interview AI, and I hope you like it. My name is Indrajit Bhowmick. You can visit my other projects in my GITHUB - https://github.com/IndrajitOD."
    
    // Automatically wrap text so it doesn't overflow
    const splitThankYou = doc.splitTextToSize(thankYouText, contentWidth - 10)
    const thankYouHeight = (splitThankYou.length * 5) + 6

    doc.setFillColor(249, 250, 251) // Light gray
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, currentY, contentWidth, thankYouHeight, 3, 3, "FD")
    
    doc.setFont("helvetica", "italic")
    doc.setFontSize(10)
    doc.setTextColor(71, 85, 105)
    doc.text(
      splitThankYou,
      pageWidth / 2,
      currentY + 7,
      { align: "center" }
    )

    currentY += thankYouHeight + 10

    doc.save("AI_Interview_report.pdf")

  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 px-4 sm:justify-between gap-4">
      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

        <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>

          <button
            onClick={() => navigate("/history")}
            className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
            <FaArrowLeft className='text-gray-600' />
          </button>

          <div className=''>
            <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
              Interview Report
            </h1>

            <p className='text-gray-500 mt-2'>
              Download your report in pdf format.
            </p>

          </div>
        </div>


        <button
          onClick={downloadPDF}
          className='text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap' style={{backgroundColor:'var(--color-purple)'}}>Download</button>


      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

        <div className='space-y-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center'>

            <h3 className='text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base'>Your Overall Performance</h3>

            <div className='relative w-20 h-20 sm:w-25 sm:h-25 mx-auto'>
              <CircularProgressbar
                value={percentage}
                text={`${score} /10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#10b981",
                  textColor: "#ef4444",
                  trailColor: "#e5e7eb"
                })} />
            </div>

            {/* <p className='text-gray-400 mt-3 text-xs sm:text-sm'>
                  Out of 10
                </p> */}

            <div className='mt-4'>
              <p className='font-semibold text-gray-800 text-sm sm:text-base'>{performanceText}</p>

              <p className='text-gray-500 text-xs sm:text-sm mt-1'>
                {shortTagline}
              </p>
            </div>


          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-6'>
              Skill Evaluation
            </h3>

            <div className='space-y-5'>
              {
                Skills.map((s, i) => (
                  <div key={i}>
                    <div className='flex justify-between mb-2 text-sm ms:text-base'>

                      <span>{s.label}</span>
                      <span className='font-semibold' style={{color:'var(--color-coral)'}}>{s.value}</span>

                    </div>

                    <div className='bg-gray-200 h-2 sm:h-3 rounded-full'>
                      <div className='bg-green-500 h-full rounded-full'
                        style={{ width: `${s.value * 10}%` }}></div>
                    </div>
                  </div>
                ))
              }
            </div>


          </motion.div>
        </div>

        <div className='lg:col-span-2 space-y-6'>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6'>
              Performance Trend
            </h3>

            <div className='h-64 sm:h-72'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area type="monotone"
                    dataKey="score"
                    stroke="#22c55e"
                    strokeWidth={3}></Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-6'>
              Question Breakdown
            </h3>

            <div className='overflow-x-auto rounded-xl border border-gray-200'>
              <table className='w-full border-collapse text-sm'>
                <thead>
                  <tr className='text-white' style={{backgroundColor:'var(--color-purple)'}}>
                    <th className='px-4 py-3 text-center font-semibold w-14 border-r border-emerald-500'>S.No</th>
                    <th className='px-4 py-3 text-left font-semibold'>Interview Details</th>
                    <th className='px-4 py-3 text-center font-semibold w-28 border-l border-emerald-500'>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {questionWiseScore.flatMap((q, i) => {
                    const details = [
                      {
                        label: 'Question',
                        value: q.question || 'Question not available',
                        cellClass: 'bg-white font-semibold text-gray-800',
                      },
                      {
                        label: 'Answer',
                        value: q.answer?.trim() || null,
                        empty: 'No answer was submitted.',
                        cellClass: i % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                      },
                      {
                        label: 'AI Feedback',
                        value: q.feedback?.trim() || null,
                        empty: 'No feedback available.',
                        cellClass: 'bg-green-50',
                      },
                      ...(q.reply?.trim()
                        ? [{
                            label: 'Reply',
                            value: q.reply.trim(),
                            cellClass: i % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                          }]
                        : []),
                    ]
                    const rowSpan = details.length

                    return details.map((detail, j) => (
                      <tr key={`${i}-${j}`} className='border-t border-gray-200'>
                        {/* S.No — only on first sub-row */}
                        {j === 0 && (
                          <td
                            rowSpan={rowSpan}
                            className='px-4 py-4 text-center font-bold text-emerald-600 border-r border-gray-200 align-middle text-base'
                          >
                            {i + 1}
                          </td>
                        )}

                        {/* Detail cell */}
                        <td className={`px-5 py-3 leading-relaxed ${detail.cellClass}`}>
                          <span className='text-xs text-gray-400 font-semibold uppercase tracking-wide block mb-1'>
                            {detail.label}
                          </span>
                          {detail.value
                            ? <span className='text-gray-700 text-sm'>{detail.value}</span>
                            : <span className='text-gray-400 italic text-sm'>{detail.empty}</span>}
                        </td>

                        {/* Score — only on first sub-row */}
                        {j === 0 && (
                          <td
                            rowSpan={rowSpan}
                            className='px-4 py-4 text-center border-l border-gray-200 align-middle'
                          >
                            <span className='px-3 py-1.5 rounded-full font-bold text-sm whitespace-nowrap' style={{backgroundColor:'var(--color-amber-light)', color:'var(--color-purple)'}}>
                              {q.score ?? 0} / 10
                            </span>
                          </td>
                        )}
                      </tr>
                    ))
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>


        </div>
      </div>
    </div>
  )
}
