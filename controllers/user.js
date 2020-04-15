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
    const errors = {};
    const notification= [];

    const {firstname,lastname,emailAddress,description} = req.body;

    if((firstname=="") || (firstname== null))
    {
        errors.firstname="Please enter your first name.";
    }

    if((lastname=="") || (lastname== null))
    {
        errors.lastname="Please enter your last name.";
    }

    if((emailAddress=="") || (emailAddress== null))
    {
        errors.emailAddress="Please enter your email address.";
    }

    if((description=="") || (description== null))
    {
        errors.description="Please enter project description.";
    }

    if(Object.keys(errors).length > 0)
    {
        //Object.keys() method returns an array of a errors object's 
        console.log(Object.keys(errors));
        res.render("user/contact",{
            messages : errors,
            data: {...req.body },
            notification
        })
    }
    else
    {
        const sgMail = require('@sendgrid/mail');

        // Email procedure
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
        to: `${emailAddress}`,
        from: 'bijayagautam8@gmail.com',
        subject: `oneTnine Inquiry Confirmation`,
        html: `
        <div>
            <h2>Hello ${firstname},</h2>
            <h3>Thank you for contacting oneTnine Team!</h3>
            <p><strong>Your enquiry:<br></strong>${description}</p></br>
            <h4>We will reach out to you shortly.</h4>
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
            
                notification.push("Inquiry Received, Thank you for contacting oneTnine !");

                // Redirecting to home page
                res.redirect("/")

                // res.render("user/contact",{
                //     messages : errors,
                //     data: {...req.body },
                //     notification
                // })

            })
            .catch((err)=>{
                notification.push("Something went wrong, please contact us directly by phone.");
                console.log(`Error occured when inserting in the database :${err}`);
            });  
        })
        .catch(err=>{
            console.log(`Error ${err}`);
            console.log(`Registration Email Not Sent.`);
        });

    }
    
});

module.exports = router;