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