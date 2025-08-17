const express=require("express")
const route=express.Router()

const multer = require('multer')
const upload = multer()

const controller=require("../../controllers/admin/account.controller")
const uploadCould=require("../../middlewares/admin/uploadCloud")
route.get("/",controller.index)

route.get("/create",controller.create)
route.post("/create",
  upload.single("avatar"),
  uploadCould.upload,
  controller.createPost
)

module.exports=route