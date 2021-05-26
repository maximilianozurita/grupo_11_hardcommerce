const express=require("express");
const app=express();
const path=require("path");

//const publicPath=path.resolve(__dirname, "./public");
//app.use(express.static(publicPath));
app.use(express.static("public"));



app.get ("/",(req,res)=>{res.sendFile(path.resolve("views/index.html"))})
app.get ("/login",(req,res)=>{res.sendFile(path.resolve("views/login.html"))})
app.get ("/register",(req,res)=>{res.sendFile(path.resolve("views/register.html"))})
app.get ("/productCart",(req,res)=>{res.sendFile(path.resolve("views/productCart.html"))})

//app.get ("/productDetail",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))})

//productos

const productsRoutes = require("./routes/productsRoutes");

app.use("/products", productsRoutes);

app.listen(3000,()=>{
    console.log("Servidor ejecutado");
});