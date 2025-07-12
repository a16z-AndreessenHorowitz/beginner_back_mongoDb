const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const objectPagiantionHelper = require("../../helpers/pagination")
const ProductCateGory=require("../../models/product-category.model")
module.exports.index=async(req,res)=>{
  //Đoạn này bộ lọc
    const filterStatus = filterStatusHelper(req.query)
    //object find
    let find = {
      deleted: false,
    }
    //Bộ lọc
    if (req.query.status) {
      find.status = req.query.status
    }
    //Đoạn này sort
    let sort={}
    if(req.query.sortKey && req.query.sortValue){
      sort[req.query.sortKey]=req.query.sortValue
    }else{
      sort.position="desc";
    }
    //Đoạn này search
    const objectSearch = searchHelper(req.query)
    if (objectSearch.regax) {
      find.title = objectSearch.regax
    }
    //Pagination
    
    const records = await ProductCateGory.find(find).sort(sort)
  
    res.render("admin/pages/product-category/index", {
      pageTitle: "Danh sách sản phẩm",
      records: records,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
    })
}

//  [PATCH] /admin/products/delete/:id
module.exports.deleteItem= async(req,res)=>{
  const id=req.params.id
  await ProductCateGory.updateOne({_id: id},{deleted:true, deletedAt:new Date()});

  req.flash("info","Đã xoá sản phẩm thành công!")
	res.redirect(`${systemConfig.prefixAdmin}/products`) //chuyển hướng //back chuyển hướng đúng tại trang đó
}


// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus= async(req,res)=>{
	const status=req.params.status
	const id =req.params.id
	await ProductCateGory.updateOne({ _id: id },{ status:status })   //update one thing

	 res.redirect(req.get('referer') || `/admin/products-category`);//chuyển hướng //back chuyển hướng đúng tại trang đó
}

// [GET] /admin/product-category/create
module.exports.create=async (req, res)=>{
  let find={
    deleted:false,

  }

  const records=await ProductCateGory.find(find)

  res.render("admin/pages/product-category/create",{
      pageTitle:"Tạo danh mục sản phẩm",
      records:records
  })
}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti= async(req,res)=>{
  // console.log(req.body)

  const type=req.body.type;
  const ids=req.body.ids.split(", ");//convert lại 1 mảng

  switch(type){
    case "active":
      await ProductCateGory.updateMany({ _id : { $in: ids }},{status:"active"})
      req.flash('info',`Cập nhật trạng thái thành ${ids.length} sản phẩm!`)
      break;
    case "inactive":
      await ProductCateGory.updateMany({ _id : { $in: ids }},{status:"inactive"})
      req.flash('info',`Cập nhật trạng thái thành ${ids.length} sản phẩm!`)
      break;
    case "delete-all":
      await ProductCateGory.updateMany({ _id : { $in: ids }},{deleted:true, deletedAt: new Date() })
      //deletemany xoá nhiều, chúng ta xoá mềm thui
      req.flash('info',`Đã xoá thành công ${ids.length} sản phẩm!`)
      break;
    case "change-position":
      for(const item of ids){
        // destructuring assignment (phân rã) trong JavaScript	
        let [id, position]=item.split("-");
        position=parseInt(position)
        await ProductCateGory.updateOne({_id:id},{ position: position})// update từng sản phẩm vì có nhiều vị trí khác nhau\
      }
      req.flash('info',`Đã cập nhật position thành công ${ids.length} sản phẩm!`)
      //Để nó hiện ra theo đúng vậy trí, quay lại phần [GET] /admin/products vì nó là nơi in ra giao diện
      
    default:
      break;

  }
   res.redirect(req.get('referer') || `/admin/products-category`);
}




// [POST] /admin/products/create
module.exports.createPost=async (req,res)=>{
    if(req.body.position==""){
		const countProducts=await ProductCateGory.countDocuments({}) 
      req.body.position=countProducts+1;
    }
    else{
      req.bod.position=parseInt(req.body.position)
    }

    const record=await ProductCateGory(req.body)
    await record.save()

   res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  
}


module.exports.detail=async(req, res)=>{
  try{
    const find={
      deleted:false,
      _id: req.params.id
    }
    const records=await ProductCateGory.findOne(find)

    res.render(`admin/pages/product-category/detail`,{
      pageTitle: records.title,
      records: records
    })
  }catch(error){
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
}
// [GET] /admin/products/edit/:id
module.exports.edit=async (req,res)=>{
  try {
    const id=req.params.id
    const records=await ProductCateGory.findOne({
      _id:id,
      deleted:false
    })
    //cây phân cấp
      const danhmuc=await ProductCateGory.find({deleted:false})

      function cayphancapdanhmuc(danhmuc,parentId=""){
        let tree=[]
        danhmuc.forEach(item => {
          if(item.parent_id===parentId){
            const newItem=item
            const children=cayphancapdanhmuc(danhmuc,item.id)
            if(children.length>0){
              newItem.children=children
            }
            tree.push(newItem)
          }
        }
      );
        return tree;
      }
        const newDanhmuc=cayphancapdanhmuc(danhmuc)
        console.log(newDanhmuc)
    res.render("admin/pages/product-category/edit.pug",{
      pageTitle:"Chỉnh sửa phẩm mới",
      records: records,
      newDanhmuc:newDanhmuc
    })
    } catch (error) {
      console.log(error)
      res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
  }

// [PATCH] /admin/products/edit/:id
module.exports.editPatch= async (req,res)=>{

  if(req.body.position){
    parseInt(req.body.position)
  }
  try {
    await ProductCateGory.updateOne({_id:req.params.id},req.body)
    req.flash("info","Cập nhật danh mục thành công!")
  } catch (error) {
    req.flash("erorr","Cập nhật danh mục không thành công!")
  }

  res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}