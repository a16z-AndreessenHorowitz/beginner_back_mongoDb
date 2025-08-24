const homeRoutes=require("./home.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware")
const cartMiddleware=require("../../middlewares/client/cart.middleware")
module.exports=(app)=>{
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)

  app.use("/",homeRoutes)
}
