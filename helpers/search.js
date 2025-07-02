module.exports=(query)=>{
    //cần return về 2 giá trị keyword và regax nên phải có object
    objectSearch={
        keyword:"",
    }
    if(query.keyword){
        objectSearch.keyword=query.keyword
        const regax = new RegExp(objectSearch.keyword,"i");
        objectSearch.regax=regax
    }
    
    return objectSearch
}