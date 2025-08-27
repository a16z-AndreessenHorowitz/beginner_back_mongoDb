
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
socket.on("SERVER_RETURN_MESSAGE",data=>{
  const myId=document.querySelector("[my-id]").getAttribute("my-id") //lấy id của form-chat
  const body=document.querySelector(".chat .inner-body")

  //tạo thẻ div
  const div=document.createElement("div")
  let htmlFullName="";
  //check tin nhắn có phải của người gửi
  if(myId==data.userId){
    div.classList.add("inner-outgoing")
  }else{
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`
    div.classList.add("inner-incoming")
  }

  div.innerHTML=`
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `
  //thêm vào body
  body.appendChild(div)
  
  bodyChat.scrollTop=bodyChat.scrollHeight //cách top đúng bằng chiều cao của scroll
  
})

//Sửa croll chat xuống dưới bottom khi load trang   
const bodyChat=document.querySelector(".chat .inner-body")
if(bodyChat){
  bodyChat.scrollTop=bodyChat.scrollHeight //cách top đúng bằng chiều cao của scroll
}