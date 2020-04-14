const express = require('express')
const router = express.Router();
const inquiryModel = require("../models/Inquiry");

//Setting up routes
router.get("/contact",(req,res)=>{

    res.render("user/contact",{
        title: "Contact",
        description: "Contact Page"
    })
});

router.post("/contact",(req,res)=>
{
    const {firstname,lastname,emailAddress,description} = req.body;

    const sgMail = require('@sendgrid/mail');

    // Email procedure
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
    to: `${emailAddress}`,
    from: 'bijayagautam8@gmail.com',
    subject: `oneTnine Inquiry Confirmation`,
    html: `
    <div>
        <h2>Thank you for contacting oneTnine Team</h2>
        <h3>We will reach out to you shortly ${firstname}!</h3>
        <p><strong>You enquiry:</strong>${description}</p></br>
        <p>Regards,</p>
        <P>oneTnine Tech Team</P>
    </div>`
    };
    sgMail.send(msg)
    .then(()=>{
        console.log(`Registration Email Sent Successfully.`); 
        const newInquiry = {
            firstname : firstname,
            lastname : lastname,
            emailAddress : emailAddress,
            description : description
        }

        const customerInquiry = new inquiryModel(newInquiry);
        customerInquiry.save()
        .then(() => {
            res.redirect(`/user/contact`)
        })
        .catch((err)=>{
            console.log(`Error occured when inserting in the database :${err}`);
        });  
    })
    .catch(err=>{
        console.log(`Error ${err}`);
        console.log(`Registration Email Not Sent.`);
    });

    
});

module.exports = router;