const express = require("express");
const request = require("request");
const app = express();
const bodyparser  = require("body-parser");
const https = require("https");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstname = req.body.Fname;
    const lastname = req.body.Lname;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME :firstname ,
                    LNAME :lastname
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);
     const url = "https://us14.api.mailchimp.com/3.0/lists/a0a5388c25"; 
     const options = {
        method:"POST",
        auth: "atul_nagar:9b4212caab856a255de3dae2b2eedf29-us14"
     }
    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname +"/failure.html");
        }
        
             response.on("data", function(data){
                console.log(JSON.parse(data));
             })
    })
    request.write(jsondata);
    request.end();

});

app.post("/failure",function(req, res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000 ,function(){
    console.log("server is running on port 3000");
})











// 9b4212caab856a255de3dae2b2eedf29-us14
// a0a5388c25