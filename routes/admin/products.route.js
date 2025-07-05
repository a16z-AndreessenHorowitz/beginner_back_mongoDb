const express=require("express")
const route=express.Router()
const productValidate=require("../../validates/product.validate")

const controller=require("../../controllers/admin/product.controller")
const { validate } = require("../../models/product.model")

route.get("/",controller.index)

route.delete("/delete/:id",controller.deleteItem)

route.patch("/change-status/:status/:id",controller.changeStatus)

route.patch("/change-multi",controller.changeMulti)

route.get("/create",controller.create)

route.post("/create",
  productValidate.createPost,
  controller.createPost
)

module.exports=route