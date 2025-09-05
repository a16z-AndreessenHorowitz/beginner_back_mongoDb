const express=require("express")
const route=express.Router()

const controller=require("../../controllers/client/user_socket.controller")

route.get("/not-friend",controller.notFriend)

module.exports=route

