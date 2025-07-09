const express = require("express")
const multer = require('multer')

const route = express.Router()
// const storageMulter= require("../../helpers/storageMulter.js")
// const upload = multer({ storage: storageMulter() }) //() gọi hàm

const upload = multer()
const controller = require("../../controllers/admin/product-catogory.controller")

route.get("/",controller.index)

module.exports=route