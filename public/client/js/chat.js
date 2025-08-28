// file-upload-with-preview
const upload = new FileUploadWithPreview.FileUploadWithPreview("upload-images");
document.addEventListener("DOMContentLoaded", () => {
  new FileUploadWithPreview.FileUploadWithPreview("upload-images", {
    multiple: true,
    maxFileCount: 6,
  });
});



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


//Hàm showtyping
const showTyping=()=>{
    socket.emit("CLIENT_SEND_TYPING","show")

      //cứ mỗi lần gõ là clear timeout
      clearTimeout(timeOut)
      timeOut=setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING","hidden")
    }, 3000 );
}

//gửi typing cho server
var timeOut;

const input=document.querySelector(".chat .inner-form input[name='content']")
if(input){
  input.addEventListener("keyup",()=>{
    showTyping()
  }
)
}



// SEVER_RETURN_TYPING
// Xử lý front-end typing
// Xử lý front-end typing
const elementTyping = document.querySelector(".chat .inner-list-typing");

if (elementTyping) {
  socket.on("SERVER_RETURN_TYPING",(data)=>{

    const existingTyping = elementTyping.querySelector(`[user-id="${data.userId}"]`);
   
    if(data.type=="show"){
      //nếu chưa có thì khởi tạo
      if(!existingTyping){
        const boxTyping=document.createElement("div")
        boxTyping.classList.add("box-typing")
        boxTyping.setAttribute("user-id",data.userId)
        boxTyping.innerHTML=`
          <div class="inner-name">${data.fullName}</div>
          <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        `
        elementTyping.appendChild(boxTyping)
         bodyChat.scrollTop=bodyChat.scrollHeight //cách top đúng bằng chiều cao của scroll
      }
    }

    if(data.type=="hidden"){
      if(existingTyping){
        elementTyping.removeChild(existingTyping)
      }
    }

  })
}

