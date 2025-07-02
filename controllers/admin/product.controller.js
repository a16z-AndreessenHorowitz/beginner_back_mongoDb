const Product=require("../../models/product.model")
const systemConfig=require("../../config/system")
// {GET} /admin/products 
module.exports.index=async(req,res)=>{
    
    let find={
        deleted:false,
    }
    let keyword="";
    if(req.query.keyword){
        keyword=req.query.keyword
        const regax = new RegExp(keyword,"i");
        find.title=regax
    }

    const product=await Product.find(find)
    
    res.render("admin/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        product:product,
        keyword:keyword
        
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