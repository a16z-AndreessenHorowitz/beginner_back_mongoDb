module.exports=(objectPagiantion,query,countProducts)=>{
     if(query.page){
        objectPagiantion.currentPage=query.page
    }
    objectPagiantion.skip=(objectPagiantion.currentPage-1)*objectPagiantion.limitItem
    
    objectPagiantion.totalPage=Math.ceil(countProducts/objectPagiantion.limitItem)

    return objectPagiantion
}