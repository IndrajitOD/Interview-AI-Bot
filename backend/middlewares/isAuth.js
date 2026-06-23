import jwt from "jsonwebtoken"

export const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        if (!token) {
            return res.status(400).json({ message: "user token missing" })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(400).json({ message: "user token not matching" })
        }

        req.userId = verifyToken.userId

        next()


    } catch (error) {
        console.log(error)
        res.clearCookie("token");
        return res.status(500).json({ message: `IsAuth Error ${error}` })

        // console.error("isAuth Error:", error.message);
        // res.clearCookie("token"); // Automatically clear the broken/expired token
        // return res.status(401).json({ message: "Session expired or invalid. Please login again." });



        // console.log(error)
        // return res.status(500).json({ message: `IsAuth Error ${error}` })


    }
}