const {Router} = require('express');
const { index, signup, login, getSignup, getLogin, addBlog, getBlogs, allblogs, displayblog, blogfilter, blogDelete } = require('../controller/user.controller');
const { findcookies, checkFiled } = require('../middleware/auth');
const router = Router();


router.get("/user/index", index);

router.get("/user/signup", signup);

router.get("/user/login", login);

router.post("/user/signup", getSignup);

router.post("/user/login", getLogin);

router.get("/blog/create",findcookies, getBlogs);

router.get("/blog/blogs", allblogs);

router.get("/blog/", displayblog)

router.post("/blog/create", checkFiled, addBlog);

router.get("/blog/filter", blogfilter);

router.delete("/blog/delete/:id", findcookies, blogDelete);


module.exports = {router};