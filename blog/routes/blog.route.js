const {Router} = require('express');
const { addBlog, getBlogs, allblogs, displayblog, blogfilter, blogDelete, blogUpdate, singleBlogpage, like, comment, searchAny, updateblog,   } = require('../controller/user.controller');
const { findcookies, checkFiled, checksignupin } = require('../middleware/auth');
const brouter = Router();


brouter.get("/create",findcookies, getBlogs);

brouter.get("/blogs", allblogs);

brouter.get("/", displayblog);

brouter.post("/create", checkFiled, addBlog);

brouter.get("/filter", blogfilter);

brouter.delete("/delete/:id", findcookies, blogDelete);

brouter.patch("/edit/:id", findcookies, blogUpdate);

brouter.get("/updateblog/:id", updateblog);

brouter.get("/singleblog/:id", singleBlogpage);

brouter.patch("/like/:id",checksignupin, like);

brouter.patch("/comment/:id",checksignupin , comment);

brouter.get("/search", searchAny);




module.exports = {brouter};