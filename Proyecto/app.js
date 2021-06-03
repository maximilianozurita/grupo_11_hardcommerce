const express=require('express');
const app=express();
const path=require('path');
app.set("view engine", "ejs");


app.set('view engine', 'ejs')
app.set('views', './views')

//const publicPath=path.resolve(__dirname, "./public");
//app.use(express.static(publicPath));
app.use(express.static('public'));

const productModel=require ("./models/productsModels")
//TRAER HTML con sendFile (ya no se usa, ahora se usar el metodo render para traer ejs)
/*app.get ("/",(req,res)=>{
    res.sendFile(path.resolve('views/index.html'))
})*/
//app.get ("/login",(req,res)=>{res.sendFile(path.resolve("/views/login.html"))})
//app.get ("/register",(req,res)=>{res.sendFile(path.resolve("views/register.html"))})
//app.get ("/productCart",(req,res)=>{res.sendFile(path.resolve("views/productCart.html"))})
//app.get ("/productDetail",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))})

//Render del HOME
app.get('/', (req, res) => {
    const productList=productModel.findAll();
    res.render('main/index',{productList: productList})})
//Render de carga y edicion de productos
app.get('/productEdition', (req, res) => {res.render('main/productEdition')})
//Render de productos
const productsRoutes = require('./routes/productsRoutes');
app.use('/products', productsRoutes)

//Render de users
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes)



app.listen(3000,()=>{
    console.log('Servidor ejecutado');
});