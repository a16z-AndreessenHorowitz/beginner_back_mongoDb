const Chat=require("../../models/chat.model")
const User=require("../../models/user.model")
const chatSocket=require("../../socket/client/chat.socket")

// [GET] /chat
module.exports.index = async (req, res) => {
  chatSocket(res)
  //Lấy data từ database 
  const chats=await Chat.find({
    deleted:false
  })
  //Lấy ra user
  for(const chat of chats){
    const infoUser=await User.findOne({
      _id:chat.user_id
    }).select("fullName avatar")

    chat.infoUser=infoUser
  }

  res.render("client/pages/chat/index",{
    pageTitle:"Chat",
    chats:chats
  })
}