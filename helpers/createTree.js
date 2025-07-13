let count=0;
function cayphancapdanhmuc(arr,parentId=""){
  let tree=[]
  arr.forEach(item => {
    if(item.parent_id===parentId){
      count++
      const newItem=item
      newItem.index=count
      const children=cayphancapdanhmuc(arr,item.id)
      if(children.length>0){
        newItem.children=children
      }
      tree.push(newItem)
      }
    }
  );
  return tree;
}
module.exports.tree=(arr,parent_id="")=>{
  count=0
  const tree=cayphancapdanhmuc(arr,parent_id="")
  return tree;
}