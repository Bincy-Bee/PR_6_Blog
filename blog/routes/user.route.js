const {Router} = require('express');
const { signup, login, getSignup, getLogin, addBlog, getBlogs, allblogs, displayblog, blogfilter, blogDelete, blogUpdate } = require('../controller/user.controller');
const { findcookies, checkFiled } = require('../middleware/auth');
const router = Router();


router.post("/user/signup", getSignup);

router.get("/user/signup", signup);

router.post("/user/login", getLogin);

router.get("/user/login", login);

router.get("/blog/create",findcookies, getBlogs);

router.get("/blog/blogs", allblogs);

router.get("/blog/", displayblog)

router.post("/blog/create", checkFiled, addBlog);

router.get("/blog/filter", blogfilter);

router.delete("/blog/delete/:id", findcookies, blogDelete);

router.patch("/blog/edit/:id", findcookies, blogUpdate);

router.get("/blog/singleBlog/:id",)


module.exports = {router};