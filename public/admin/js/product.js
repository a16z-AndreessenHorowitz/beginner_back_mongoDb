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