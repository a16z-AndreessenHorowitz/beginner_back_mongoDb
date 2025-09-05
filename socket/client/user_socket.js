const User=require("../../models/user.model")
module.exports=(res)=>{
  //socket
  _io.once('connection', (socket) => {

    socket.on("CLIENT_ADD_FRIEND",async(userId)=>{

      //khi A gửi yêu cầu cho B thì 
        // +thêm id của A vào acceptFriend của B
        // +Thêm id của B vào requestFriend của A


      // console.log(userId) //id của B tại vì bấm kết bạn nên nó lấy getAtribute của B gửi lên
      const myId=res.locals.user.id 
      // console.log(myId)
      
          // +thêm id của A vào acceptFriend của B
          const existId_AinB=await User.findOne({
            _id:userId,
            acceptFriend: myId //nó tự hiểu tìm trong mảng có myId hay ko
          })
          if(!existId_AinB){
            await User.updateOne({
              _id:userId,
            },{
              $push: { acceptFriend :  myId}
            })
          }


          // +Thêm id của B vào requestFriend của A
           const existId_BinA=await User.findOne({
            _id:myId,
            requestFriend: userId 
          })
          if(!existId_AinB){
            await User.updateOne({
              _id:myId,
            },{
              $push: { requestFriend :  userId}
            })
          }

    })

    
  })
}