const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const objectPagiantionHelper = require("../../helpers/pagination")

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
    const countProducts = await Product.countDocuments(find)
  
    let objectPagiantion = objectPagiantionHelper({
      currentPage: 1,
      limitItem: 4,
    }, req.query, countProducts)

    const records = await Product.find(find).limit(objectPagiantion.limitItem).skip(objectPagiantion.skip).sort(sort)
  
    res.render("admin/pages/product-category/index", {
      pageTitle: "Danh sách sản phẩm",
      records: records,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagiantion
    })
}