const ProductCateGory=require("../../models/product-category.model")
const createTreeHelper=require("../../helpers/createTree.js")

module.exports.category=async (req,res,next)=>{
  const productsCategory = await ProductCateGory.find({
      deleted:false,
  })

  const newProductsCategory=createTreeHelper.tree(productsCategory)
  res.locals.layoutProductCategory=newProductsCategory

  next()
}
