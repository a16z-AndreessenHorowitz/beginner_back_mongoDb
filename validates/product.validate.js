module.exports.createPost=(req,res,next)=>{
  if(!req.body.title){
    req.flash("error","Vui lòng nhập tiêu đề")
		res.redirect(req.get('referer') || '/admin/products/create')
		return; //Ngăn chặn dòng code phía dưới
	}
  const price=parseInt(req.body.price)
  if(isNaN(price) || price <0){
    req.flash("error","Vui lòng nhập giá tiền cho sản phầm")
		res.redirect(req.get('referer') || '/admin/products/create')
		return; //Ngăn chặn dòng code phía dưới
	}
  next()
}