const multer = require('multer')
module.exports = () => {
  const storage = multer.diskStorage({ //multer nó lưu ngâmg file đồ r
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
  return storage
}