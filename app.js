const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const ejs=require('ejs');

const app=express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/watchStore')

const schema=new mongoose.Schema({
    email:String,
    Password:String
})
const user=mongoose.model("User",schema);

app.get('/',(req,res)=>{
    res.render('home');
})

app.get("/brands",(req,res)=>{
    res.render('brands')
})
app.get("/cart",(req,res)=>{
    res.render('cart')
})
app.get("/login",(req,res)=>{
    res.render('login')
})
app.get("/signUp",(req,res)=>{
    res.render('signUp')
})
app.post('/signUp',(req,res)=>{
    const email=req.body.email;
    const Password=req.body.password;
    console.log(req.body);
    const newUser= new user({
        email:email,
        Password:Password
    })
    newUser.save();
})
app.post('/login',(req,res)=>{
    user.findOne({email:req.body.email}).then((User)=>{
        if(User){
            if(req.body.password===User.Password){
                res.redirect('/cart');
            }
            else{
                console.log("wrong password");
            }
        }
        else{
            console.log("no such user found!!")
            res.redirect('/login')
        }
      
    })
})
app.listen(3000,function(){
    console.log('server started sucessfully!')
})