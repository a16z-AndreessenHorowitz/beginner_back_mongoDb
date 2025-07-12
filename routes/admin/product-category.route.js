const express = require("express")
const multer = require('multer')

const route = express.Router()
// const storageMulter= require("../../helpers/storageMulter.js")
// const upload = multer({ storage: storageMulter() }) //() gọi hàm

const upload = multer()

const controller=require("../../controllers/admin/product-catogory.controller.js")
const validate = require("../../validates/product-category.validate.js")
const uploadCloud=require("../../middlewares/admin/uploadCloud")


route.get("/",controller.index)



route.patch("/change-status/:status/:id",controller.changeStatus)

route.delete("/delete/:id",controller.deleteItem)

route.patch("/change-multi",controller.changeMulti)
route.get("/create",controller.create)

//Khác nhau bởi phương thức
route.post("/create",
  upload.single('thumbnail'),
  uploadCloud.upload,
  //middle ware
  validate.creatPost,
  controller.createPost
)

route.get("/edit/:id",controller.edit)

route.patch("/edit/:id",
  upload.single('thumbnail'),
  uploadCloud.upload,
  controller.editPatch
)

route.get("/detail/:id",controller.detail)
module.exports=route