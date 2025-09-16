const socket = io();

// SERVER_RETURN_LENGTH_ACCEPTFRIEND
const badeUserAccept=document.querySelector("[badge-users-accept]")
if(badeUserAccept){
  const userid=badeUserAccept.getAttribute("badge-users-accept")
  console.log(userid)
  socket.on("SERVER_RETURN_LENGTH_ACCEPTFRIEND", (data) => {
    if(userid===data.userId){
       badeUserAccept.innerHTML=data.lengthAcceptFriends
    }
   
  });
}

// SERVER_RETURN_LENGTH_ACCEPTFRIEND


// SERVER_RETURN_INFO_ACCEPT_FRIEND
const dataUserAccept=document.querySelector("[data-users-accept]")
if(dataUserAccept){
  const userId=dataUserAccept.getAttribute("data-users-accept")
  socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND",(data)=>{
    if(userId==data.userId){

      //vẽ user ra giao diên
      const div=document.createElement("div")
      div.classList.add("col-6")

      
      div.innerHTML=`
          <div class="box-user">
            <div class="inner-avatar">
              <img src="/upload/User.svg.png" alt="User Avatar">
            </div>
            <div class="inner-info">
              <div class="inner-name">${data.infoUserA.fullName}</div>
              <div class="inner-buttons">
                <button class="btn btn-primary btn-sm mr-1"
                        btn-accept-friend=${data.infoUserA._id}>
                  Chấp nhận
                </button>
                <button class="btn btn-secondary btn-sm mr-1"
                        btn-refuse-friend=${data.infoUserA._id}>
                  Xoá
                </button>
                <button class="btn btn-primary btn-sm mr-1"
                        btn-deleted-friend
                        disabled="disabled">
                  Đã xoá
                </button>
                <button class="btn btn-primary btn-sm mr-1"
                        btn-accepted-friend
                        disabled="disabled">
                  Đã chấp nhận
                </button>
              </div>
            </div>
          </div>
        `;

        dataUserAccept.append(div)
        // hết vẽ user ra giao diên

      //bắt sự kiện cho nút huỷ lời mời kết bạn( lấy từ bên kia qua đã làm nhưng khác là chỉ bắt sự kiện cho 1 nút)
      const buttonRefuse=div.querySelector("[btn-refuse-friend]") 
      //query trong thẻ div mới vừa tạo
      buttonRefuse.addEventListener("click",()=>{
        
        const userId=buttonRefuse.getAttribute("btn-refuse-friend")
        console.log(userId)

        //thêm cho thẻ cha .add để nó hiện ẩn kết bạn, huỷ
        // console.log(buttonRefuse.closest((".box-user")))
        buttonRefuse.closest((".box-user")).classList.add("refuse")

        //gửi lên socket
        socket.emit("CLIENT_REFUSE_FRIEND",userId)
        })
      //bắt sự kiện cho nút huỷ lời mời kết bạn

    }
})
}


// SERVER_RETURN_INFO_ACCEPT_FRIEND
