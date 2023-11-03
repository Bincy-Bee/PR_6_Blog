const { user } = require("../models/user.schema");

const findcookies = async(req,res,next)=>{
    let {id} = req.cookies;

    if(id){
        let data = await user.findById(id);
        console.log(data)
        if (data.role == "admin"){
            next()
        }
        else{
            res.send(`You are not authorized to access this page.`)
        }
    }
    else{
        res.redirect("login")
    }
}

const checkFiled = async(req,res,next)=>{
    let {title, content,image,category}= req.body;

    if (title && content && image && category){
        next()
    }
    else{
        res.status(400).send(`All fields are required`);
    }
}

module.exports = {findcookies, checkFiled}