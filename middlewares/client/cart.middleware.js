const Cart=require("../../models/cart.model")

module.exports.cartId=async (req ,res,next)=>{

  if(!req.cookies.cartId){
    //Tạo giỏ hàng
    const cart=new Cart()
    await cart.save()
    // console.log(cart)

    const expiresCookie=365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId",cart.id,{expires: new Date(Date.now()+expiresCookie)})
  }else{
    //Có rồi lấy ra thôi
    const cart=await Cart.findOne({
      _id:req.cookies.cartId,
    })
    if (cart && Array.isArray(cart.products)) {
      const totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
      res.locals.miniCart = totalQuantity;
    } else {
      res.locals.miniCart = 0;
    }
  }
  next()
}