const express=require('express');
const app=express();
const path=require('path');
const productModels=require ("./models/productsModels")
app.set("view engine", "ejs");
app.set('views', './views');

app.use(express.static('public'));

//TRAER HTML con sendFile (ya no se usa, ahora se usar el metodo render para traer ejs)

//Render del HOME
app.get('/', (req, res) => 
{
    const productList=productModels.findAll();
    res.render('main/index',{productList})
});
//Render de carga y edicion de productos
app.get('/productEdition', (req, res) => {res.render('main/productEdition')})
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