const express=require("express")
const multer=require("multer")
const upload=multer();

const route=express.Router()

const controller=require("../../controllers/admin/setting.controller")
const uploadCloud=require("../../middlewares/admin/uploadCloud")

route.get("/general",controller.general)

route.patch("/general",
  upload.single("logo"),
  uploadCloud.upload,
  controller.generalPatch
)

module.exports=route