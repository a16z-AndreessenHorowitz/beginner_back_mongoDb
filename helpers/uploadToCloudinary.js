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

let streamUpload = (buffer) => {
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

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports.uploadToCloudinary = async (buffer) => {
  let result = await streamUpload(buffer);
  //đường dẫn ảnh
  return result.url
}
