const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelper=require("../../helpers/products.js")


// [GET] /cart/add/:productId
module.exports.index=async (req,res)=>{
  const cartId=req.cookies.cartId
  
  const cart=await Cart.findOne({
    _id:cartId
  })
  if(cart.products.length>0){
    for(item of cart.products){
      const productId=item.product_id 
      const productInfo=await Product.findOne({
        _id:productId
      }).select("title thumbnail slug price discountPercentage") //lấy theo các trường muốn chọn
      //giá mới sản phẩm 
      productInfo.priceNew=productHelper.priceNewProduct(productInfo)
      item.productInfo=productInfo
      //Tổng tiền sản phẩm
      item.totalPrice=productInfo.priceNew*item.quantity
    }
  }
  //Tông đơn hàng của tất cả các hàng
  cart.totalPrice=cart.products.reduce((sum,item)=>sum+item.totalPrice,0)


  res.render("client/pages/cart/index.pug",{
    pageTitle:"Giỏ hàng",
    cardDetail: cart
  })
}

// [POST] /cart/add/:productId
module.exports.addPost=async (req, res)=>{
 const productId=req.params.productId;
 const quantity=parseInt(req.body.quantity)
 //lấy id giỏ hàng 
 const cartId=req.cookies.cartId;

 
 //check sản phẩm có tồn tại trong giỏ hàng hay chưa?
  const cart=await Cart.findOne({
    _id:cartId
  })


  const existProductInCart=cart.products.find(item=>
    item.product_id==productId
  );//hàm find trong js để tìm một, filter tìm nhiều

  // console.log(existProductInCart)
  if(existProductInCart){
    //nếu tồn tại
    const quantityNew=quantity+existProductInCart.quantity

   await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      { $set: { "products.$.quantity": quantityNew} }
    );
    //set cập nhật lại trường có sẵn
    req.flash("info", "Đã cập nhật số lượng sản phẩm");
    res.redirect("back")

  }else{
    const objectCart={
    product_id:productId,
    quantity:quantity,
 }
  await Cart.updateOne(
    {
      _id:cartId
    },
    {
      $push:{ products: objectCart}
    }
  )

  req.flash("info","Đã thêm sản phẩm vào giỏ hàng")
  res.redirect("back");
  }
}

// [GET] /cart/delete/:productId
module.exports.delete=async (req, res)=>{
  const cartId=req.cookies.cartId
  
  const productId=req.params.productId

  await Cart.updateOne({
    _id:cartId,
  },{
    $pull: {products : { product_id: productId}}
  })
  req.flash("info","Đã xoá sản phẩm thành công!")
  res.redirect("back")
}

// [GET] /cart/update/:productId/:quantity
module.exports.update=async (req, res)=>{
 const productId=req.params.productId
 const quantity=req.params.quantity
 const cartId=req.cookies.cartId

 await Cart.updateOne({
  _id: cartId,
  "products.product_id":productId
 },{
  $set: { "products.$.quantity": quantity}
 })
 req.flash("info","Đã cập nhật sản phẩm thành công!")
  res.redirect("back")
}



