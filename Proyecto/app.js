const express=require("express");
const app=express();
const path=require("path");

app.listen(3000,()=>{
    console.log("Servidor ejecutado");
});

const publicPath=path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.get ("/",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/index.html"))})
app.get ("/login",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/login.html"))})
app.get ("/register",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/register.html"))})
app.get ("/productCart",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/productCart.html"))})
app.get ("/productoDetail",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))})