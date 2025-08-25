const systemConfig=require("../../config/system")
const productRoutes=require('./products.route')
const dashboardRoutes=require("./dashboard.route")
const productsCategoryRoutes=require("./product-category.route")
const roleRoutes=require("./role.route.js")
const accountRoutes=require("./account.route.js")
const authRoutes=require("./auth.route.js")
const settingRoutes=require("./setting.route.js")
const authMiddleware=require("../../middlewares/admin/auth.middleware.js")
module.exports=(app)=>{
  const PATH_ADMIN=systemConfig.prefixAdmin
  app.use(PATH_ADMIN+"/dashboard",authMiddleware.requireAuth,dashboardRoutes)
  app.use(PATH_ADMIN+"/products",authMiddleware.requireAuth,productRoutes)
  app.use(PATH_ADMIN+"/products-category",authMiddleware.requireAuth,productsCategoryRoutes)
  app.use(PATH_ADMIN+"/roles",authMiddleware.requireAuth,roleRoutes)
  app.use(PATH_ADMIN+"/accounts",authMiddleware.requireAuth,accountRoutes)
  app.use(PATH_ADMIN+"/auth",authRoutes)
  app.use(PATH_ADMIN+'/settings',authMiddleware.requireAuth,settingRoutes)
}