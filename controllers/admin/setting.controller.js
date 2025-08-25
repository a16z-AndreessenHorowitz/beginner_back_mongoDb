const SettingGeneral=require("../../models/setting-general.model")

// [GET] /admin/settings/general
// phần này chỉ duy nhất 1 bản ghi
module.exports.general=async (req, res)=>{
const settingGeneral=await SettingGeneral.findOne({})//lấy ra bản ghi đầu tiên

  res.render("admin/pages/settings/general.pug",{
    pageTitle:"Cài đặt chung",
    settingGeneral:settingGeneral
    }
)}


// [Patch] /admin/settings/general
//Phương thức nào cx dc, get nó cx tạo bản ghi mới chỉ là ko an toàn. Cái này ăn gian cho edit
module.exports.generalPatch = async (req, res) => {
  let settingGeneral = await SettingGeneral.findOne({});

  if (settingGeneral) {
    // nếu không có logo trong req.body thì giữ logo cũ vì update ghi đè
    if (!req.body.logo) {
      req.body.logo = settingGeneral.logo;
    }

    await SettingGeneral.updateOne(
      { _id: settingGeneral.id },
      req.body
    );
  } else {
    const record = new SettingGeneral(req.body);
    await record.save();
  }

  res.redirect("back");
};
