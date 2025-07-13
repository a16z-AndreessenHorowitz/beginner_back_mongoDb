// https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
//api key
cloudinary.config({ 
        cloud_name: process.env.UPCLOUD_NAME, 
        api_key: process.env.UPCLOUD_KEY, 
        api_secret: process.env.UPCLOUD_SECRET, 
    });
//end api key
module.exports.upload=(req, res, next) =>{
    if(req.file){
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        //đường dẫn ảnh
        req.body[req.file.fieldname]=result.url
        //req.file[req.file.fieldname] tránh đặt cứng tên name trường gửi lên vì nó có thể thay đổi
        next()
    }

    upload(req);
    }else{
      // vì hàm upload là async await nên check nếu có file thì vào th trên, còn không chạy dưới này 
    next()
    }
}