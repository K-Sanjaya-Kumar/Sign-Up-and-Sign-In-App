const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser=require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173'],
    methods:["GET","POST"],
    credentials:true
}));
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

const verifyUser=(req,resp,next)=>{
    const token=req.cookies.token;
    if(!token){
        return resp.json("the token was not available");
    }
    else{
        jwt.verify(token,"jwt-secret-key", (err,decoded)=>{
            if(err){
                return resp.json("Token is wrong")
            
            }
            next();
        })
    }
}
app.get('/home',verifyUser,(req,resp)=>{
    return resp.json("Success");
})

app.post("/login", (req, resp) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {

            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {


                    if (response) {
                        const token=jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"1d"})
                        resp.cookie("token",token);


                        resp.json("Success");
                    }
                    else {
                        resp.json("the password is incorrect");


                    }


                })
            }
            else {
                resp.json("No record existed");
            }
        })

})

app.post('/register', (req, resp) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            EmployeeModel.create({ name, email, password: hash })
                .then(employees => resp.json(employees))
                .catch(err => resp.json(err));
        }).catch(err => console.log(err.message));



})
app.listen(3001, () => {
    console.log("server is running");

});
