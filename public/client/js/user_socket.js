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
