const systemConfig=require("../../config/system")
const Account=require("../../models/account.model")
const Role=require("../../models/roles.model")
const md5 = require('md5');
// {GET} /admin/accounts
module.exports.index=async(req , res)=>{
  let find={
    deleted:false
  }

  const records=await Account.find(find).select("-password -token")
  for(const record of records){
    const role=await Role.findOne({
      _id: record.role_id,
      deleted:false
    }) 
    record.role=role
  }

  res.render("admin/pages/accounts/index",{
    pageTitle:"Danh sách tài khoản",
    records:records
  })
}

module.exports.create=async(req , res)=>{
  const roles=await Role.find({
    deleted:false
  })
  res.render("admin/pages/accounts/create",{
    pageTitle:"Tạo tài khoản",
    roles:roles
  })
}
// [POST] /admin/accounts/create
module.exports.createPost=async(req , res)=>{
  const emailExist=await Account.findOne({
    email:req.body.email,
    deleted:false
  })
  if(emailExist){
    req.flash("error",`Email ${req.body.email} đã tồn tại!`)
     es.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
  }else{
    req.body.password=md5(req.body.password)
    const record=new Account(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)  
  }

}


// [GET] /admin/accounts/edit/:id
module.exports.edit=async(req, res)=>{
  let find={
    deleted:false,
    _id:req.params.id
  }
  const data=await Account.findOne(find)
  const roles=await Role.find({
    deleted:false
  })
  res.render("admin/pages/accounts/edit",{
      pageTitle:"Chỉnh sửa tài khoản",
      data:data,
      roles:roles
  })
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch=async(req, res)=>{
  const emailExist=await Account.findOne({
    _id:{
      $ne: req.params.id  //nghĩa là "tìm account có email này nhưng không phải account đang sửa".
    },
    email:req.body.email,
    deleted:false
  })
  if(emailExist){
    req.flash("error","Cập nhật tài khoản không thành công")
  }else{
    if(req.body.password){
      req.body.password=md5(req.body.password)
    }else{
      delete req.body.password
    }

    await Account.updateOne({_id:req.params.id},req.body)
    req.flash("success","Cập nhật tài khoản thành công")
  }
  res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`)
}