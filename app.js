const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const axios = require('axios');

const app=express(); //new  instance of express

const https=require('https');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get('/',function(req,res){
res.sendFile(__dirname+"/signup.html");
});


const apiKey = "be64fe7cf194be64bf2b1246473eaec3-us21";
const listId = "3b7840ac18";
const endpoint = `https://us21.api.mailchimp.com/3.0/lists/${listId}/members`;



  

app.post('/',function(req,res){
const firstName=req.body.fname;
const lastName=req.body.lname;
const email=req.body.email;
const data={
members:[
    {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
    }
}
]
};
const jsonData = JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/3b7840ac18";
const options={
method:"POST",
auth:"komal1991:be64fe7cf194be64bf2b1246473eaec3-us21"}
    
const request=https.request(url, options, function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
//request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})





app.listen(3000,function(){
console.log("Server is running on port 3000");
});

//api key
//be64fe7cf194be64bf2b1246473eaec3-us21
//3b7840ac18