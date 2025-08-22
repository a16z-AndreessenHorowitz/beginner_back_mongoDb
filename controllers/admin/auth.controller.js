const md5=require("md5")
const systemConfig=require("../../config/system")
const Account=require("../../models/account.model")
// [GET] /admin/auth
module.exports.login=async (req, res)=>{
  if(req.cookies.token){
   res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
  }else{
    res.render("admin/pages/auth/login",{
      pageTitle:"Trang đăng nhập"
    })
  }
}

// [PATCH] /admin/auth
module.exports.loginPost=async (req, res)=>{
  const {email,password}=req.body
  const user=await Account.findOne({
    email:email,
    deleted:false
  })
  if(!user){
    req.flash("error","Email không tồn tại!")
    res.redirect(`/admin/auth/login`)
    return ; //khỏi chạy code phía dưới
  }
  if(md5(password) != user.password){
    req.flash("error","Mật khẩu không tồn tại!")
    res.redirect(`/admin/auth/login`)
    return ; //khỏi chạy code phía dưới
  }
  if(user.status == "inactive"){
    req.flash("error","Tài khoản đã bị khoá")
    res.redirect(`/admin/auth/login`)
    return
  }
  res.cookie("token",user.token)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

// [GET] /admin/auth/logout
module.exports.logout=async (req, res)=>{
  res.clearCookie("token")
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}