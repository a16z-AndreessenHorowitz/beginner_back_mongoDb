const Chat=require("../../models/chat.model")
const User=require("../../models/user.model")
// [GET] /chat
module.exports.index = async (req, res) => {
  const userId=res.locals.user.id
  const fullName=res.locals.user.fullName
  //socket
  _io.once('connection', (socket) => {
        //socket nhận từ client
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
        //Lưu vào database
        const chat = new Chat({
          user_id: userId,
          content: content
        })  
        await chat.save();

        //socket gửi về cho client
      socket.emit("SERVER_RETURN_MESSAGE",{
        content:content,
        userId:userId,
        fullName:fullName
      })
      
    });

    

    
  })

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