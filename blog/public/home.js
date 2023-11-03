
const displayblog = (data)=>{
    document.getElementById("parent-box").innerHTML="";
    data.map((ele)=>{

        let img = document.createElement("img");
        img.src = ele.image;
        img.setAttribute("id", "blogimage");

        let title = document.createElement("p");
        title.innerHTML = ele.title;
        title.setAttribute("id", "blogtitle");

        let deletebutton = document.createElement("button");
        deletebutton.innerHTML = "Delete";
        deletebutton.setAttribute("id","deletblog");
        deletebutton.addEventListener("click",()=>{
            delblog(ele._id);
        })

        let div = document.createElement("div");
        div.setAttribute("id", "list");
        div.addEventListener("click",()=>{
            id = ele.id;
        })

        div.append(img, title, deletebutton);
        document.getElementById("parent-box").append(div);
    })

};

const delblog=(id)=>{

    fetch(`http://localhost:8090/blog/delete/${id}`, {
        method : "DELETE"
    })
}

const filterCategory=(category)=>{
    fetch(`http://localhost:8090/blog/filter?category=${category}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    displayblog(data)
    })
}
document.getElementById("sports").addEventListener("click",()=>filterCategory("sports"))
document.getElementById("technology").addEventListener("click",()=>filterCategory("technology"))
document.getElementById("electronic").addEventListener("click",()=>filterCategory("electronic"))
document.getElementById("health").addEventListener("click",()=>filterCategory("health"))
document.getElementById("entertainment").addEventListener("click",()=>filterCategory("entertainment"))

const get = async()=>{

    fetch("http://localhost:8090/blog/blogs")
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    displayblog(data)
    })
}
get();