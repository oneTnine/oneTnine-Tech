const express = require('express')
const router = express.Router();

//Setting up routes
router.get("/",(req,res)=>{
    res.render("general/home",{
        title: "oneTnine Tech",
        description: "Welcome to oneTnine Tech",
    })
});

router.get("/aboutUs",(req,res)=>{
    res.render("general/aboutUs",{
        title: "About Us",
        description: "About Us Page"
    })
});

router.get("/contact",(req,res)=>{
    res.render("general/contact",{
        title: "Contact",
        description: "Contact Page"
    })
});

module.exports = router;