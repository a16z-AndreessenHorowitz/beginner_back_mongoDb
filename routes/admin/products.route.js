const express=require("express")
const route=express.Router()

const controller=require("../../controllers/admin/product.controller")

route.get("/",controller.index)

route.delete("/delete/:id",controller.deleteItem)

route.patch("/change-status/:status/:id",controller.changeStatus)

route.patch("/change-multi",controller.changeMulti)

route.get("/create",controller.create)

route.post("/create",controller.createPost)

module.exports=route