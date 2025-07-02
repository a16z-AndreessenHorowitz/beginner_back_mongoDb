const Product=require("../../models/product.model")
const systemConfig=require("../../config/system")
const filterStatusHelper=require("../../helpers/filterStatus")
const searchHelper=require("../../helpers/search")
// {GET} /admin/products 
module.exports.index=async(req,res)=>{
    //Đoạn này bộ lọc
    const filterStatus=filterStatusHelper(req.query)
    //object find
    let find={
        deleted:false,
    }
    //Bộ lọc
    if(req.query.status){
        find.status=req.query.status
    }
    //Đoạn này search
    const objectSearch=searchHelper(req.query)
    if(objectSearch.regax){
        find.title=objectSearch.regax
    }

    const product=await Product.find(find)
    
    res.render("admin/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        product:product,
        filterStatus: filterStatus,
        keyword:objectSearch.keyword
        
    })
}

// {DELETE} /admin/products/delete/:id
module.exports.deleteItem=async(req,res)=>{
    const id=req.params.id;
    await Product.updateOne({_id:id},
        {
            deleted:true,
        }
    )
    req.flash("success","Xoá sản phẩm thành công!")
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}