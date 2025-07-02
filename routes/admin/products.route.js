const express=require("express")
const route=express.Router()

const controller=require("../../controllers/admin/product.controller")

route.get("/",controller.index)

route.delete("/delete/:id",controller.deleteItem)


module.exports=route