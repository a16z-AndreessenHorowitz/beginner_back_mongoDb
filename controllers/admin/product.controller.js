const Product = require("../../models/product.model")
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const objectPagiantionHelper = require("../../helpers/pagination")
// {GET} /admin/products 
module.exports.index = async (req, res) => {
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
  //Đoạn này search
  const objectSearch = searchHelper(req.query)
  if (objectSearch.regax) {
    find.title = objectSearch.regax
  }
  //Pagination
  const countProducts = await Product.countDocuments(find)

  let objectPagiantion = objectPagiantionHelper({
    currentPage: 1,
    limitItem: 4,
  }, req.query, countProducts)
  const product = await Product.find(find).limit(objectPagiantion.limitItem).skip(objectPagiantion.skip).sort({"position":"desc"})

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    product: product,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagiantion

  })
}

// {DELETE} /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({
    _id: id
  }, {
    deleted: true,
  })
  req.flash("success", "Xoá sản phẩm thành công!")
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// {PATCH} /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id

  await Product.updateOne({
    _id: id
  }, {
    status: status
  })
  req.flash("success", "Thay đổi trạng thái thành công")
  const backURL = req.get("Referer") || "/admin/products";
  res.redirect(backURL);

}

// {PATCH} /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const ids = req.body.ids.split(", ")
  const type = req.body.type
  switch (type) {
    case "active":
      await Product.updateMany({
        _id: {
          $in: ids
        },
      }, {
        $set: {
          status: type
        }
      })
      req.flash("success","Thay đổi trạng thái thành công thành công!")
      break;
    case "inactive":
      await Product.updateMany({
        _id: {
          $in: ids
        },
      }, {
        $set: {
          status: type
        }
      })
      req.flash("success","Thay đổi trạng thái thành công thành công!")
      break;
    case "delete-all":
      await Product.updateMany({
        _id: {
          $in: ids
        },
      }, {
        $set: {
          deleted: true
        }
      })
      req.flash("success","Xoá sản phẩm thành công!")
      break;
    case "change-position":
      console.log(req.body)
      for(item of ids){
        let [id,position]=item.split("-")
        position=parseInt(position)
        await Product.updateOne({
          _id: id,
        },{
          position:position
        })
      }
      req.flash("success","Cập nhật vị trí thành công!")
      break;
    default:
      break;
  }
  res.redirect(req.get('referer') || '/admin/products');
}