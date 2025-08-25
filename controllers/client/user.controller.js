const User=require("../../models/user.model")
const md5 = require('md5');
const Cart=require("../../models/cart.model");
const generateHelper=require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
const sendEmailHelper=require("../../helpers/sendEmail")
// [GET] /user/register
module.exports.register= async(req, res)=>{

  res.render("client/pages/user/register",{
    pageTitle:"Đăng ký tài khoản"
  })
}

// [POST] /user/register
module.exports.registerPost= async(req, res)=>{
  console.log(req.body)
  const existEmail=await User.findOne({
    email:req.body.email
  })
  if(existEmail){
    req.flash("error","Email đã tồn tại")
    res.redirect("back")
    return;
  }
  req.body.password=md5(req.body.password)

  const user=new User(req.body)
  await user.save()

  //Lưu cookies
  res.cookie("tokenUser",user.tokenUser)
  res.redirect("/")
}

// [GET] /user/login
module.exports.login= async(req, res)=>{
  res.render("client/pages/user/login",{
    pageTitle:"Đăng nhập tài khoản"
  })
}

// [POST] /user/login
module.exports.loginPost= async(req, res)=>{
  const email=req.body.email
  const password=req.body.password

  const user=await User.findOne({
    email:email,
    deleted:false
  })
  if(!user){
     req.flash("error","Email không tồn tại")
     res.redirect("back")
     return 
  }
  if(md5(password)!== user.password){
    req.flash("error","Mật khẩu không chính xác")
    res.redirect("back")
    return 
  }
  if(user.status==="inactive"){
    req.flash("error","Tài khoản đang bị khoá")
    res.redirect("back")
    return 
  }
  const cart=await Cart.findOne({
    user_id:user.id
  })
  if(cart){
    res.cookie("cartId",cart.id)
  }else{
    await Cart.updateOne({
      _id:req.cookies.cartId,
    },{
      user_id:user.id
    })
  }
  res.cookie("tokenUser",user.tokenUser)
  res.redirect("/")
}

// [GET] /user/logout
module.exports.logout= async(req, res)=>{
  res.clearCookie("cartId")
  res.clearCookie("tokenUser")
  res.redirect("/")
}

// [GET] /user/password/forgot
module.exports.forgotPassword= async(req, res)=>{
  res.render("client/pages/user/forgot-password",{
    pageTitle:"Lấy lại mật khẩu"
  })
}

// [POST] /user/password/forgot
module.exports.forgotPasswordPost= async(req, res)=>{
  const email=req.body.email
  const user=await User.findOne({
    email:email,
    deleted:false
  })
  if(!user){
    req.flash("error","Email không tồn tại")
  }
  //Lưu thông tin vào DB trước khi gửi email
  const otp=generateHelper.generateRandomNumber(6)
  const objectForgotPassword={
    email:req.body.email,
    otp:otp,
    expireAt:Date.now()
  }

  //Nếu tồn tại gửi mã eamil
  const subject="Mã OTP xác minh lấy lại mật khẩu"
  const html=`
  Mã OTP để lấy lại mật khẩu là <b>${otp}</b>.Thời hạn sử dụng là 3 phút.
  `
  sendEmailHelper.sendMail(email,subject,html)

  const forgorPassword=new ForgotPassword(objectForgotPassword)
  await forgorPassword.save()

  res.redirect(`/user/password/otp?email=${email}`)
}