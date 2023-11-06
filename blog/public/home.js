
// let id = -1;
const displayblog = (data)=>{
    document.getElementById("parent-box").innerHTML="";
    data.map((ele)=>{

        let img = document.createElement("img");
        img.src = ele.image;
        img.setAttribute("class", "img");
        // img.addEventListener("click",()=>{
        //     window.location.href=`/blog/singleBlog/${ele._id}`
        // })

        let title = document.createElement("p");
        title.innerHTML = ele.title;
        title.setAttribute("class", "title");

        

        let deletebutton = document.createElement("button");
        deletebutton.innerHTML = "Delete";
        deletebutton.setAttribute("id","deletblog");
        deletebutton.addEventListener("click",()=>{
            delblog(ele._id);
        })

        let div = document.createElement("div");
        div.setAttribute("class", "list");
        
        div.append(img, title,  deletebutton);
        div.addEventListener("click",()=>{
            window.location.href=`/blog/singleBlog/${ele._id}`
        })
        

        document.getElementById("parent-box").append(div);
    })

};

const delblog=(id)=>{

    fetch(`http://localhost:8090/blog/delete/${id}`, {
        method : "DELETE"
    }).then(()=>get())
}

const filterCategory=(category)=>{
    fetch(`http://localhost:8090/blog/filter?category=${category}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    displayblog(data)
    })
}
document.getElementById("sports").addEventListener("click",()=>filterCategory("sports"));
document.getElementById("technology").addEventListener("click",()=>filterCategory("technology"));
document.getElementById("electronic").addEventListener("click",()=>filterCategory("electronic"));
document.getElementById("health").addEventListener("click",()=>filterCategory("health"));
document.getElementById("entertainment").addEventListener("click",()=>filterCategory("entertainment"));

const get = async()=>{

    fetch("http://localhost:8090/blog/blogs")
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    displayblog(data)
    })
}
get();