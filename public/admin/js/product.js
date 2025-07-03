//Button Delete
const buttonDelete=document.querySelectorAll("[button-delete]")
if(buttonDelete.length>0){
    const formDelete=document.querySelector("#form-delete-status")
    const path=formDelete.getAttribute("data-path")
    buttonDelete.forEach(button=>{
        button.addEventListener("click",()=>{
            const isConfirm=confirm("Bạn có chắc muốn xoá")
            if(isConfirm==true){
                const id=button.getAttribute("data-id")
                const action=`${path}/${id}?_method=DELETE`

                formDelete.action=action
                
                formDelete.submit()
            }
        })
    })
}
//Button Delete


//Change status
const buttonChangestatus=document.querySelectorAll("[button-change-status]")
if(buttonChangestatus.length>0){
    const formChangeStatus=document.querySelector("#form-change-status")
    const path=formChangeStatus.getAttribute("path")
    buttonChangestatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusCurrent=button.getAttribute("data-status")
            const id=button.getAttribute("data-id")
            let statusChange=statusCurrent=="active" ? "inactive" : "active"
            
            formChangeStatus.action=`${path}/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.submit();
        })
    })
}
// change status 