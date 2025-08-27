
//client send message 
const formSearch=document.querySelector(".inner-form")
if(formSearch){
  formSearch.addEventListener("submit",(e)=>{
    e.preventDefault()
    const content=e.target.elements.content.value
    if(content){
      //gửi lên server, trong js file socket nhúng trước chat nên có socket
      socket.emit("CLIENT_SEND_MESSAGE",content)

      e.target.elements.content.value="";
    }
  })
}

//server return message