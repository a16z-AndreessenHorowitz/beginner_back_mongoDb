const systemConfig=require("../../config/system")
const Account=require("../../models/account.model")
const Role=require("../../models/roles.model")
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