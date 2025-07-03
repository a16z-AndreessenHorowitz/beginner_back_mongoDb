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
const pagination=document.querySelectorAll("[button-pagination]")
if(pagination.length>0){
  let url=new URL(window.location.href)
  pagination.forEach(pageitem=>{
    pageitem.addEventListener("click",(e)=>{
      const page=pageitem.getAttribute("button-pagination")
      if(page){
        url.searchParams.set("page",page)
      }
      else{
        url.searchParams.delete("page")
      }
      window.location.href=url.href
    })
  })
  
}
// pagination 
