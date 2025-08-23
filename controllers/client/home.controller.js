const Product=require('../../models/product.model')
const ProductCategory=require("../../models/product-category.model")
const productHelper=require('../../helpers/products')
const createTreeHelper=require("../../helpers/createTree")
//{GET} home
module.exports.index=async(req ,res )=>{
  //Lấy ra sản phẩm nổi bật
  const featureProduct=await Product.find({
    deleted:false,
    featured:"1"
  })

  //Lấy ra sản phẩm
  const productsNew=await Product.find({
    deleted:false,
    status:"active",
  }).sort({position:"desc"})
  const newProducts=productHelper.priceNewProducts(productsNew)

  res.render("client/pages/home/index",{
      pageTitle:"Trang chủ",
      productsNew:newProducts,
      featureProduct:featureProduct
  })
}