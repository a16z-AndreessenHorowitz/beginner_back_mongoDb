const User=require("../../models/user.model")
module.exports.notFriend=async(req,res)=>{
  const userId=res.locals.user.id

  const users=await User.find({
    _id:{$ne:userId}, //lấy ra tài khoản trừ thằng này
    status:"active",
    deleted:false
  }).select("id avatar fullName")


  res.render("client/pages/users_socket/not-friend",{
    pageTitle:"Danh sách người dùng",
    users:users,
  })
}