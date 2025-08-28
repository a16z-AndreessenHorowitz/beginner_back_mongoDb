const uploadToCloudinary=require("../../helpers/uploadToCloudinary")

module.exports.upload =async (req, res, next) => {
  if (req.file) {
    const link=await uploadToCloudinary.uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = link
      //req.file[req.file.fieldname] tránh đặt cứng tên name trường gửi lên vì nó có thể thay đổi
      
  }
  next()
}