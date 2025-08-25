const express=require("express")
const route=express.Router()
const validate=require("../../validates/user.validate")
const authMiddleware=require("../../middlewares/client/auth.middleware")
const controller=require("../../controllers/client/user.controller")

route.get("/register",controller.register)
route.post("/register",validate.register,controller.registerPost)

route.get("/login",controller.login)
route.post("/login",controller.loginPost)

route.get("/logout",controller.logout)

route.get("/password/forgot",controller.forgotPassword)
route.post("/password/forgot",validate.forgotPasswordPost,controller.forgotPasswordPost)

route.get("/password/otp",controller.otpPassword)
route.post("/password/otp",controller.otpPasswordPost)

route.get("/password/reset",controller.resetPassword)
route.post("/password/reset",validate.resetPasswordPost,controller.resetPasswordPost)

route.get("/info",authMiddleware.requireAuth,controller.info)//vì nó private
module.exports=route