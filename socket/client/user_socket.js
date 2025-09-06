const User=require("../../models/user.model")
module.exports=(res)=>{
  //socket
  _io.once('connection', (socket) => {
    // chức năng gửi yêu cầu
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
    //chức năng huỷ yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND",async(userId)=>{
      const myUserId=res.locals.user.id // id ông A, id ông B là userId

      //khi xoá id 
        // + Xoá id của A trong acceptFriend của B
        // + Xoá id của B trong requestFriedn của A


      // + Xoá id của A trong acceptFriend của B
      const existIdAinB=await User.findOne({
        _id: userId,
        acceptFriend: myUserId
      })
      if(existIdAinB){
        await User.updateOne({
          _id: userId,
        },{
          $pull : { acceptFriend : myUserId}
        })
      }

      // + Xoá id của B trong requestFriedn của A
      const existIdBinA=await User.findOne({
        _id: myUserId,
        requestFriend: userId
      })
      if(existIdBinA){
        await User.updateOne({
          _id: myUserId,
        },{
          $pull : { requestFriend : userId}
        })
      }

    })

    //chức năng từ chối lời mời kết bạn
    socket.on("CLIENT_REFUSE_FRIEND",async(userId)=>{
      const myUserId=res.locals.user.id //ở trường hợp này chúng ta đóng vai trò ông B vì chúng ta là người từ chối
      // Chức năng từ chối: Khi B từ chối A (tương tự A hủy yêu cầu cho B)
      //   + Xoá A trong accept của B
      //   + Xoá B trong request của A

      // + Xoá A trong accept của B
      const exitstainB=await User.findOne({
        _id: myUserId,
        acceptFriend: userId
      })
      if(exitstainB){
        await User.updateOne({
          _id: myUserId
        },{
          $pull: {acceptFriend : userId}
        })
      }

      // + Xoá B trong request của A
      const exitstbinA=await User.findOne({
        _id: userId,
        acceptFriend: myUserId
      })
      if(exitstbinA){
        await User.updateOne({
          _id: userId
        },{
          $pull: {acceptFriend : myUserId}
        })
      }
    })
  })
}