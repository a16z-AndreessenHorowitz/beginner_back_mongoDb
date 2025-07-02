const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id:{
        type: String,
        default:"",
    },
    description:String,
    category: String,
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

});

const Product = mongoose.model('Product', productSchema,'products');

module.exports = Product;