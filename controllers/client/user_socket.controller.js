const User=require("../../models/user.model")
const userSocket=require("../../socket/client/user_socket")

// {get} //users/not-friend
module.exports.notFriend=async(req,res)=>{
  // socket 
  userSocket(res)
  // socket 

  const userId=res.locals.user.id

  const myUser=await User.findOne({
    _id:userId
  })

  const requestFriend=myUser.requestFriend;// lấy ra cái này để loại trừ nó
  const acceptFriend=myUser.acceptFriend// lấy ra cái này để loại trừ nó nữa

  const users = await User.find({
    _id: { 
      $ne: userId, 
      $nin: [...requestFriend, ...acceptFriend] 
    },
    status: "active",
    deleted: false
  }).select("id avatar fullName")


  res.render("client/pages/users_socket/not-friend",{
    pageTitle:"Danh sách người dùng",
    users:users,
  })
}


// {get} //users/request
module.exports.request=async(req,res)=>{
  // socket 
  userSocket(res)
  // socket 

  const userId=res.locals.user.id

  const myUser=await User.findOne({
    _id:userId
  })

  const requestFriend=myUser.requestFriend;// lấy ra cái này để loại trừ nó
  const acceptFriend=myUser.acceptFriend// lấy ra cái này để loại trừ nó nữa

  const users = await User.find({
    _id: { 
      $in: requestFriend
    },
    status: "active",
    deleted: false
  }).select("id avatar fullName")

  res.render("client/pages/users_socket/request",{
    pageTitle:"Lời mời đã gửi",
    users:users
  })
}

// {get} //users/accept
module.exports.accept=async(req,res)=>{
  // socket 
  userSocket(res)
  // socket 

  const userId=res.locals.user.id

  const myUser=await User.findOne({
    _id:userId
  })

  const acceptFriend=myUser.acceptFriend

  const users = await User.find({
    _id: { 
      $in: acceptFriend
    },
    status: "active",
    deleted: false
  }).select("id avatar fullName")

  res.render("client/pages/users_socket/accept",{
    pageTitle:"Lời mời kết bạn",
    users:users
  })
}