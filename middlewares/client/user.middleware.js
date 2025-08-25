const User=require("../../models/user.model")

module.exports.infoUser=async (req,res, next)=>{
  //nếu có trả thông tin user, không có thì cứ cho đăng nhập bình thường
  //mục đích đưa thông tin ra giao diện
  const token=req.cookies.tokenUser
  if(token){
    const user=await User.findOne({
      tokenUser:token,
      deleted:false,
      status:"active"
    }).select("-password")
    if(user){
      res.locals.user=user
    }
  }
  next()
}