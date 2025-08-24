const Product=require("../../models/product.model")
const systemCongfig=require("../../config/system");
const ProductCateGory = require("../../models/product-category.model");
const productHelper=require("../../helpers/products");
const productCategoryHelper = require("../../helpers/products-category");

// [GET] /products
module.exports.index= async (req,res)=>{
    const products = await Product.find({
        status:"active",
        deleted:false,
    }).sort({position: "desc"});
    
    products.forEach(item=>{
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
        //hàm foreach không cần return 
    })



    res.render("client/pages/products/index.pug",{
        pageTitle:"Trang danh sách sản phẩm",
        products: products
    })
}


// [GET] /detail/:slugProduct
module.exports.detail= async(req, res)=>{
  const find={
    deleted:false,
    slug:req.params.slugProduct,
    status:"active"
  }
  let product=await Product.findOne(find)
  // thêm vào danh mục cha 
  if(product.product_category_id){
      const category= await ProductCateGory.findOne({
        _id: product.product_category_id,
        status:"active",
        deleted:false
      })

        product = product.toObject();
        product.category = category ? category.toObject() : null;
    }
  //tính giá sản phẩm 
  product.priceNew=productHelper.priceNewProduct(product)

  res.render("client/pages/products/detail",{
      pageTitle:"Chi tiết sản phẩm",
      product: product,
  })
}

// [GET] /products/:slugCategory
module.exports.category= async(req, res)=>{
  const category =await ProductCateGory.findOne({
    slug:req.params.slugCategory,
    deleted:false,
    status:"active",
  })

  const listSubCategory=await productCategoryHelper.getSubCategory(category.id)
  const listSubCategoryId=listSubCategory.map(item=>item.id)

    const products=await Product.find({
      product_category_id:{$in:[category.id, ...listSubCategoryId]},
      deleted:false,
    }).sort({position:"desc"})

      const newProducts=productHelper.priceNewProducts(products)

  res.render("client/pages/products/index.pug",{
        pageTitle:category.title,
        products: newProducts
    })
}