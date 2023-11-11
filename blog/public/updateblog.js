let url = window.location.href.split("/");
console.log(url)
let id = url[url.length - 1]
console.log(id)

document.getElementById("blogForm").addEventListener("submit",(e)=>{
e.preventDefault();
const udata = {
title : document.getElementById("title").value,
content : document.getElementById("content").value,
category : document.getElementById("category").value,
image : document.getElementById("image").value,
}
console.log(udata)
fetch(`/blog/edit/${id}`,{
    method:"PATCH",
    headers : {"Content-type" : "application/json"},
    body : JSON.stringify(udata)
});
})