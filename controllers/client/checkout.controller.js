const Cart=require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelper=require("../../helpers/products")
// [GET]/checkout 
module.exports.index=async(req,res)=>{
  const cartId=req.cookies.cartId
  const cart=await Cart.findOne({
    _id:cartId
  })

  if(cart.products.length>0){
    for(item of cart.products){
      const productId=item.product_id
      const productInfo= await Product.findOne({
        _id:productId,
      }).select("title thumbnail slug price discountPercentage") //lấy theo các trường muốn chọn

      productInfo.priceNew=productHelper.priceNewProduct(productInfo)

      item.productInfo=productInfo
      item.totalPrice=productInfo.priceNew + item.quantity

      console.log(item)
    }
  }

  cart.totalPrice=cart.products.reduce((sum,item)=>sum+item.totalPrice,0)

   res.render("client/pages/checkout/index",{
    pageTitle:"Đặt hàng", 
    cartDetail:cart
  })
}