const Product=require("../../models/product.model")
const systemConfig=require("../../config/system")
const filterStatusHelper=require("../../helpers/filterStatus")
const searchHelper=require("../../helpers/search")
const objectPagiantionHelper=require("../../helpers/pagination")
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
    //Pagination
    const countProducts=await Product.countDocuments(find)

    let objectPagiantion=objectPagiantionHelper({
        currentPage:1,
        limitItem:4,
    },req.query,countProducts)
    const product=await Product.find(find).limit(objectPagiantion.limitItem).skip(objectPagiantion.skip)

    res.render("admin/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        product:product,
        filterStatus: filterStatus,
        keyword:objectSearch.keyword,
        pagination:objectPagiantion
        
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

// {PATCH} /admin/products/change-status/:status/:id
module.exports.changeStatus=async(req,res)=>{
    const status=req.params.status
    const id=req.params.id

    await Product.updateOne({
        _id:id
    },{
        status:status
    })
    req.flash("success","Thay đổi trạng thái thành công")
    const backURL = req.get("Referer") || "/admin/products";
    res.redirect(backURL);

}