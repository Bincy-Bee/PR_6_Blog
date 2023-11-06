document.getElementById("like").addEventListener("click",(e)=>{
    e.preventDefault();
    let url = window.location.href.split("/");
    let id = url[url.length - 1]

    fetch(`/blog/like/${id}`,{
        method : "PATCH",
        headers : {"Content-type" : "application/json"}
    }).then(()=>{
        let likecount = document.getElementById("count").innerHTML;
        document.getElementById("count").innerHTML = Number(likecount) + 1;
    })

   
})
document.getElementById("comment").addEventListener("submit",(e)=>{
    e.preventDefault();

    let url = window.location.href.split("/");
    console.log(url)
    let id = url[url.length - 1]
    console.log(id)
    let comments ={
        comment : document.getElementById("incomment").value,
    }
    fetch(`/blog/comment/${id}`,{
        method : "PATCH",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(comments)
    })
})