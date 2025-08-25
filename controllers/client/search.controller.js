const Product=require("../../models/product.model")
const productsHelper=require("../../helpers/products.js")
// [GET] /search
module.exports.index= async (req,res)=>{
  let keyword=""
  
  let newProduct=[];
  if(req.query){
    keyword=req.query.keyword
  
    const regax=new RegExp(keyword,"i")
    const products=await Product.find({
      title:regax,
      deleted:false,
      status:"active",
    })

    newProduct=productsHelper.priceNewProducts(products)
    // .find() là thứ tạo ra mảng dữ liệu sản phẩm từ DB add vào newProduct
  }


  res.render("client/pages/search/index",{
      pageTitle:"Kết quả tìm kiếm",
      keyword:keyword,
      products:newProduct,
  })
}