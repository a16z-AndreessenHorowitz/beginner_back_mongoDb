const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    description:String,
    price: Number,
    discountPercentage:Number,
    status: String,
    stock: Number,
    thumbnail: String,
    featured:String,

    slug: { type: String,
        slug: "title",
        unique: true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    position:Number,
    createdBy:{
      account_id:String,
      createdAt:{
        type:Date,
        default:Date.now
      }
    },
    deletedBy:{
      account_id:String,
      deletedAt:{
        type:Date,
        default:Date.now
      }
    }

},{ timestamps: true });

const Product = mongoose.model('Product', productSchema,'products');

module.exports = Product;