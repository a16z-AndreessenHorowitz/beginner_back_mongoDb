// Chức năng gửi yêu cầu
let listBtnAddFriend=document.querySelectorAll("[btn-add-friend]")
  if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach(button=>{
      button.addEventListener("click",()=>{
        
        const userId=button.getAttribute("btn-add-friend")
        console.log(userId)

        //thêm cho thẻ cha .add để nó hiện ẩn kết bạn, huỷ
        // console.log(button.closest((".box-user")))
        button.closest((".box-user")).classList.add("add")

        //gửi lên socket
        socket.emit("CLIENT_ADD_FRIEND",userId)
      })
    })
  }
// Chức năng gửi yêu cầu


// Chức năng huỷ yêu cầu
let listBtnCancelFriend=document.querySelectorAll("[btn-cancel-friend]")
  if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(button=>{
      button.addEventListener("click",()=>{
        
        const userId=button.getAttribute("btn-cancel-friend")
        console.log(userId)

        //thêm cho thẻ cha .add để nó hiện ẩn kết bạn, huỷ
        // console.log(button.closest((".box-user")))
        button.closest((".box-user")).classList.remove("add")

        //gửi lên socket
        socket.emit("CLIENT_CANCEL_FRIEND",userId)
      })
    })
  }
// Chức năng huỷ yêu cầu


// Chức năng xoá lời mời kết bạn (từ chối)
let listBtnRefuseFriend=document.querySelectorAll("[btn-refuse-friend]")
  if(listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach(button=>{
      button.addEventListener("click",()=>{
        
        const userId=button.getAttribute("btn-refuse-friend")
        console.log(userId)

        //thêm cho thẻ cha .add để nó hiện ẩn kết bạn, huỷ
        // console.log(button.closest((".box-user")))
        button.closest((".box-user")).classList.add("refuse")

        //gửi lên socket
        socket.emit("CLIENT_REFUSE_FRIEND",userId)
      })
    })
  }
// Chức năng xoá lời mời kết bạ

