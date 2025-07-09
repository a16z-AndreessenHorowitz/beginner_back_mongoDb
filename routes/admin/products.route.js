const express=require("express")
const route=express.Router()
const productValidate=require("../../validates/product.validate")
//ảnh
// const storageMulter=require("../../helpers/storeRage")
const uploadCloud=require("../../middlewares/admin/uploadCloud")
const multer  = require('multer')
// const upload = multer({ storage:  storageMulter() })
const fileUpload = multer()
//end ảnh
const controller=require("../../controllers/admin/product.controller")


route.get("/",controller.index)

route.delete("/delete/:id",controller.deleteItem)

route.patch("/change-status/:status/:id",controller.changeStatus)

route.patch("/change-multi",controller.changeMulti)

route.get("/create",controller.create)

route.post("/create",
  fileUpload.single('thumbnail'),
  uploadCloud.upload,
  productValidate.createPost,
  controller.createPost
)

route.get("/details/:id",controller.detail)

route.get("/edit/:id",controller.edit)

route.patch("/edit/:id",
  fileUpload.single('thumbnail'),
  uploadCloud.upload,
  productValidate.createPost,
  controller.editPost
)

module.exports=route