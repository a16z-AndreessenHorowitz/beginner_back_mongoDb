const Chat=require("../../models/chat.model")

module.exports=(res)=>{
  const userId=res.locals.user.id
  const fullName=res.locals.user.fullName
  
  //socket
  _io.once('connection', (socket) => {
        //socket nhận từ client
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
        //Lưu vào database
        const chat = new Chat({
          user_id: userId,
          content: data.content
        })  
        await chat.save();

        //socket gửi về cho client
      _io.emit("SERVER_RETURN_MESSAGE",{
        content:data.content,
        userId:userId,
        fullName:fullName
      })
      
    });

    //typing
    socket.on("CLIENT_SEND_TYPING",async (type)=>{
      //tất nhiên ông gõ ko nhận dc typing
      socket.broadcast.emit("SERVER_RETURN_TYPING",{
        userId:userId,
        fullName:fullName,
        type:type
      })
    })





    
  })
}