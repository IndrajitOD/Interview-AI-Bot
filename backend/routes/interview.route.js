import express from "express"
// import { analyzeRezume } from "../controllers/interview.controller"
// import { getCurrentUser } from "../controllers/user.controller.js"
// import { isAuth } from "../middlewares/isAuth.js"
import { analyzeRezume, generateQuestion, finishInterview, submitAnswer, getMyInterviews, getInterviewReport } from "../controllers/interview.controller.js"
import { isAuth } from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"

const interviewRouter = express.Router()
// userRouter.get("/current-user", isAuth, getCurrentUser)

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeRezume)
interviewRouter.post("/generate-questions",isAuth,generateQuestion)
interviewRouter.post("/submit-answer",isAuth,submitAnswer)
interviewRouter.post("/finish",isAuth,finishInterview)

interviewRouter.get("/get-interview",isAuth,getMyInterviews)
interviewRouter.get("/report/:id",isAuth,getInterviewReport)



export default interviewRouter