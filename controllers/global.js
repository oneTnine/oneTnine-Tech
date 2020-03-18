const express = require('express')
const router = express.Router();

//Setting up routes
router.get("/services",(req,res)=>{
    res.render("global/services",{
        title: "Services",
        description : "Services Page"
    })
});

router.get("/careers",(req,res)=>{
    res.render("global/careers",{
        title: "Careers",
        description: "Careers Page"
    })
});

module.exports = router;