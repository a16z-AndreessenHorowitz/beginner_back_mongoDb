const Product=require('../../models/product.model')
const ProductCategory=require("../../models/product-category.model")
const productHelper=require('../../helpers/products')
const createTreeHelper=require("../../helpers/createTree")
//{GET} home
module.exports.index=async(req ,res )=>{


  //Lấy ra danh mục
  const productCategory=await ProductCategory.find({
    deleted:false,
  })
  const newproductCategory=createTreeHelper.tree(productCategory)
  
  //Lấy ra sản phẩm
  const productsNew=await Product.find({
    deleted:false,
    status:"active",
  }).sort({position:"desc"})
  const newProducts=productHelper.priceNewProducts(productsNew)

  res.render("client/pages/home/index",{
      pageTitle:"Trang chủ",
      productsNew:newProducts,
      layoutProductCategory:newproductCategory
  })
}