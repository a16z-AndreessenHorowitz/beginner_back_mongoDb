//permission
const tablePermission=document.querySelector("[table-permission]")
if(tablePermission){
  const buttonSubmit=document.querySelector("[button-subbmit]")
  buttonSubmit.addEventListener("click",()=>{
    let permissions=[]
    const rows=document.querySelectorAll("[data-name]")
    
    rows.forEach(row=>{
      //lấy ra tên của các dòng
      const name=row.getAttribute("data-name")
      //lấy ra từng dòng input của tên đó
      const inputs=row.querySelectorAll("input")
      
      if(name=="id"){
        //lặp qua từng dòng input nếu có tên name=id
       inputs.forEach(input=>{
        const id=input.value
        //nếu id thì push id vào 
        permissions.push({
          id:id,
          permissions:[]//đảm bảo push ko bị undefined
        })
       })

      }else{
        //nếu tên không phải id
        inputs.forEach((input,index)=>{
          //tìm ô input đã check
          const checked=input.checked

          if(checked){
            permissions[index].permissions.push(name)
          }
        })
      }
    
    })

    if(permissions.length>0){
      const formChangePermission=document.querySelector("#form-change-permission")
      const inputPermission=formChangePermission.querySelector("input[name='permissions']")
      // chuyển đổi một giá trị JavaScript (như object hoặc array) thành chuỗi JSON (string).
      inputPermission.value=JSON.stringify(permissions)
      formChangePermission.submit()
    }

  })
}
//end permission