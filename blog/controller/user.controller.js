const fuse = require('fuse.js');
const { blog } = require("../models/Blog.schema");
const { user } = require("../models/user.schema");


const getSignup = async(req,res)=>{
    try {
        let data = await user.findOne({email : req.body.email});
        if(data){
            return res.cookie("id", data.id).cookie("role", data.role).send(`Account created successfully ${data.username}`)
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

const movie = (req,res)=>{
    res.send("Welcome to the movie API")
}

const blogDelete = async(req,res)=>{
    try {
        const {id} = req.params;
        let deletedBlog = await blog.findByIdAndDelete(id);
        res.send(deletedBlog)
    } catch (error) {
        return res.send(error.message)
    }
}

const blogUpdate = async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        let blogupdate = await blog.findByIdAndUpdate(id, req.body);
        res.send(blogupdate)
    } catch (error) {
        return res.send(error.message)
    }
}
const updateblog =async (req,res)=>{
    const {id} = req.params;
    
    let udata = await blog.findById(id);
    res.render("updateblog", {udata});
}

const singleBlogpage = async(req,res)=>{
    try {
        let {id} = req.params;
        let singleBlog = await blog.findById(id);
        res.render("singleBlogPage", {singleBlog});
    } catch (error) {
        return res.send(error.message)
    }
}
const like = async(req,res)=>{
    try {
        let {id} = req.params;
        let liker = await user.findById(req.cookies.id)
        let likecount = await blog.findById(id);
        likecount.likedBy.push({username: liker.username});
        await likecount.save();
        res.send({likecount})
        
    } catch (error) {
        return res.send(error.message)
    }
}

const comment = async(req,res)=>{
    try {
        let {comment} = req.body;
        let {id} = req.params;
        let commenter = await user.findById(req.cookies.id);
        let postcomment = await blog.findById(id);
        postcomment.comments.push({text:comment, username: commenter.username});
        await postcomment.save();
        res.send(postcomment)
    } catch (error) {
        return res.send(error.message)
    }
}

const searchAny = async(req,res)=>{
    try {
        let query = req.query.blogs;
        const blogs = await blog.find();
        const option = { keys : ["author", "category", "title",]}

        const fuseFilter = new fuse(blogs, option)
        const result = fuseFilter.search(query);
        return res.send(result)
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {signup, login, getSignup, getLogin, addBlog, getBlogs, allblogs, displayblog, blogfilter, blogDelete, blogUpdate, singleBlogpage, movie, like, comment, searchAny, updateblog}