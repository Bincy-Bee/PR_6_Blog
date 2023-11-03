const { blog } = require("../models/Blog.schema")
const { user } = require("../models/user.schema")


const getSignup = async(req,res)=>{
    try {
        let data = await user.findOne({email : req.body.email});
        if(data){
            return res.send({username : req.body.username})
        }
        else{
            let data = await user.create(req.body);
            return res.cookie("id", data.id).cookie("role", data.role).send(`Account created successfully ${data.username}`);
        }
        
    } catch (error) {
        return res.send(error.message)
    }
}

const signup = (req,res)=>{
    res.render("signup")
}

const getLogin = async(req,res)=>{
    try {
        let data = await user.findOne({email : req.body.email});
        if (!data){
            return res.send(`Invalid Credentials.`)
        }

        if(data.password != req.body.password){
            return res.send(`Invalid Credentials.`)
        }

        return  res.cookie("id", data.id).cookie("role", data.role).cookie("author", data.username).send(`Welcome User ${data.username}`);

    } catch (error) {
        return res.send(error.message)
    }
}

const login = (req,res)=>{
    res.render("login")
}


const allblogs = async (req,res)=>{
    try {
        let allblogs = await blog.find();
        return res.send(allblogs);
        
    } catch (error) {
        return res.send(error.message);
    }
}

const getBlogs = (req,res)=>{
    res.render("blog")
}


const displayblog = (req,res)=>{
    res.render("index")
}

const addBlog = async(req,res)=>{
    let {id} = req.cookies;
    let {title, content,image,category}=req.body;
    const newBlog = {
        title: title,
        content: content,
        image:image,
        category: category,
        author: req.cookies.author
    }
    try {
        let adder = await user.findById(id);
        let newblogs = await blog.create(newBlog);
        res.cookie("blogId", newblogs.id).send(`blog created by ${adder.username}`)
    } catch (error) {
        return res.send(error.message)
    }
}

const blogfilter = async(req,res)=>{
    let {category} = req.query;
    let fildata = {};
    if (category){
        fildata.category = category
    }
    
    let filterdata = await blog.find(fildata)
    res.send(filterdata);
}

const blogDelete = async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id);
        let deletedBlog = await blog.findByIdAndDelete(id);
        res.send(deletedBlog)
    } catch (error) {
        return res.send(error.message)
    }
}

const blogUpdate = async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id);
        let blogupdate = await blog.findByIdAndUpdate(id);
        res.send(blogupdate)
    } catch (error) {
        return res.send(error.message)
    }
}

const singleBlogpage = (req,res)=>{
    try {
        res.render("single")
        
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {signup, login, getSignup, getLogin, addBlog, getBlogs, allblogs, displayblog, blogfilter, blogDelete, blogUpdate}