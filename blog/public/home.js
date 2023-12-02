let blogmap = [];
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

        let editbutton = document.createElement("button");
        editbutton.innerHTML = "Edit";
        editbutton.setAttribute("id","editblog");
        editbutton.addEventListener("click",(e)=>{
            e.preventDefault();
            window.location.href=`/blog/updateblog/${ele._id}`;
            
        })

        let div = document.createElement("div");
        div.setAttribute("class", "list");
        
        div.append(img, title, editbutton);
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


document.getElementById("insearch").addEventListener("input", (e)=>{
    e.preventDefault();

    let query = document.getElementById("insearch").value;

    fetch(`http://localhost:8090/blog/search?blogs=${query}`)
    .then((res)=> res.json())
    .then((data)=>{
        if(data.length > 0){
            for (i=0; i < data.length; i++){
                blogmap.push(data[i].item);
                displayblog(blogmap);
            }
        }
        else{
            get();
        }
    })
})



const get = async()=>{

    fetch("http://localhost:8090/blog/blogs")
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    displayblog(data)
    })
}
get();