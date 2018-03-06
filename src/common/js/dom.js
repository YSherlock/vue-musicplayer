export function getData(el,name,val){
  if(val){
    return el.setAttribute("data-"+name,val)
  }else{
    return el.getAttribute("data-"+name)
  }
}
