const express=require('express');
const path=require('path');
const method = require('method-override');
const productsModels=require(__dirname + "/models/productsModels");
const productModel=require ("./models/productsModels");

//Guarda los modulos de express en app.
const app=express();

//Ejecuta el metodo para utilizar method
app.use(method('_method'));

//Setea para utilizar EJS con una ruta en views
app.set('view engine', 'ejs');
app.set('views', './views');

// No olvidarse esto para que la data se envie correctamente desde un formulario
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//ESTABLECIENDO RUTAS ESTATICAS EN PUBLIC
//const publicPath=path.resolve(__dirname, "./public");
//app.use(express.static(publicPath));
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, './public')));

//TRAE EL HTML con sendFile (ya no se usa, ahora se usar el metodo render para traer ejs)
/*app.get ("/",(req,res)=>{
    res.sendFile(path.resolve('views/index.html'))
})*/
//app.get ("/login",(req,res)=>{res.sendFile(path.resolve("/views/login.html"))})
//app.get ("/register",(req,res)=>{res.sendFile(path.resolve("views/register.html"))})
//app.get ("/productCart",(req,res)=>{res.sendFile(path.resolve("views/productCart.html"))})
//app.get ("/productDetail",(req,res)=>{res.sendFile(path.resolve(__dirname, "./views/productDetail.html"))})

//Render del HOME sin routes y controller.
app.get('/', (req, res) => {
    const productList=productsModels.findAll();
    res.render('main/index',{productList})
})

//Render de productos
const productsRoutes = require('./routes/productsRoutes');
app.use('/products', productsRoutes)

//Render de users
const userRoutes = require('./routes/userRoutes');
const { dirname } = require('path');
app.use('/user', userRoutes)


//Si no encuentra la pagina porque el URL es incorrecto redirige a la pagina "not-found".
app.use((req,res,next)=>{
    res.status(404).render("./main/not-found");
    next();
})


//Abre el servidor
app.listen(3000,()=>{
    console.log('Servidor ejecutado');
});