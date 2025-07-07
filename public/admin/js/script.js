//Flash
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"))
  const closeAlert = showAlert.querySelector("[close-alert]")
  setTimeout((time) => {
    showAlert.classList.add("alert-hidden")
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}
//end flash

//Form search
const formSearch = document.querySelector("#form-search")
if (formSearch) {
  let url = new URL(window.location.href)
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    const keyword = e.target.elements.keyword.value
    if (keyword) {
      url.searchParams.set("keyword", keyword)
    } else {
      url.searchParams.delete("keyword")
    }
    window.location.href = url.href
  })

}

//form search

//button-status
const buttonStatus = document.querySelectorAll("[btn-status]")
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href)
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("btn-status")
      if (status) {
        url.searchParams.set("status", status)
      } else {
        url.searchParams.delete("status")
      }
      window.location.href = url.href
    })
  })
}
//button-status

// pagination 
const pagination = document.querySelectorAll("[button-pagination]")
if (pagination.length > 0) {
  let url = new URL(window.location.href)
  pagination.forEach(pageitem => {
    pageitem.addEventListener("click", (e) => {
      const page = pageitem.getAttribute("button-pagination")
      if (page) {
        url.searchParams.set("page", page)
      } else {
        url.searchParams.delete("page")
      }
      window.location.href = url.href
    })
  })

}
// pagination 

// checkbox 
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const checkall = checkboxMulti.querySelector("input[name='checkall']")
  const inputIds = checkboxMulti.querySelectorAll("input[name='id']")
  checkall.addEventListener("click", () => {
    if (checkall.checked == true) {
      inputIds.forEach(input => {
        input.checked = true;
      })
    } else {
      inputIds.forEach(input => {
        input.checked = false;
      })
    }
  })

  inputIds.forEach(input => {
    input.addEventListener("click", () => {
      const inputslength = checkboxMulti.querySelectorAll("input[name='id']:checked").length
      if (inputIds.length == inputslength) {
        checkall.checked = true
      } else {
        checkall.checked = false
      }
    })
  })

}

// checkbox 

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault()

    const checkboxMulti = document.querySelector("[checkbox-multi]")
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")
    const typeChange = e.target.elements.type.value
    //delete việc để ở đây là có chủ đích , để ngăn ngừa người dùng xoá hàng loạt bản ghi
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc chắc muốn xoá không?")
      if (!isConfirm) {
        return;
      }
    }
    //end delete
    if (inputsChecked.length > 0) {
      let ids = []
      const inputIds = formChangeMulti.querySelector("input[name='ids']")
      inputsChecked.forEach(input => {
        const id = input.value //Hoặc input.getAtribute("value")
        if(typeChange=="change-position"){
          const position=input.closest("tr").querySelector("input[name='position']").value
          ids.push(`${id}-${position}`)
        }else{
          ids.push(id)
        }
      })
    

    inputIds.value=ids.join(", ")
    formChangeMulti.submit()
    }
    else {
      alert("Vui lòng chọn ít nhất 1 sản phẩm")
    }

  })
}
//form change multi


//Upload Image
const uploadImage=document.querySelector("[upload-image]")
if(uploadImage){
  const uploadImageInput=document.querySelector("[upload-image-input]")
  const uploadImageReview=document.querySelector("[upload-image-review]")

  const buttonCloseImage=document.querySelector("[button-close-image]")
  uploadImageInput.addEventListener("change",(e)=>{
    const file=e.target.files[0]
    
    if(file){
      buttonCloseImage.classList.remove("hidden")
      uploadImageReview.src=URL.createObjectURL(file)

      buttonCloseImage.addEventListener("click",()=>{
        uploadImageInput.value=""
        uploadImageReview.src=""
        buttonCloseImage.classList.add("hidden")
      })
    }
  }) 

}
//Upload Image