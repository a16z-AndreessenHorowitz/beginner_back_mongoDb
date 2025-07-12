const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productCateGorySchema = new mongoose.Schema({
    title: String,
    description:String,
    parent_id:{
      type:String,
      default:"",
    },
    status: String,
    thumbnail: String,
    slug: { type: String,
        slug: "title",
        unique: true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    position:Number,
    deletedAt:Date

},{ timestamps: true });

const productCateGory= mongoose.model('ProductCategory', productCateGorySchema,"products-category");

module.exports = productCateGory;