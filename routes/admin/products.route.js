const express=require("express")
const route=express.Router()
const productValidate=require("../../validates/product.validate")
//ảnh
const storageMulter=require("../../helpers/storeRage")
const multer  = require('multer')
const upload = multer({ storage:  storageMulter() })

const controller=require("../../controllers/admin/product.controller")


route.get("/",controller.index)

route.delete("/delete/:id",controller.deleteItem)

route.patch("/change-status/:status/:id",controller.changeStatus)

route.patch("/change-multi",controller.changeMulti)

route.get("/create",controller.create)

route.post("/create",
  upload.single('thumbnail'),
  productValidate.createPost,
  controller.createPost
)

module.exports=route