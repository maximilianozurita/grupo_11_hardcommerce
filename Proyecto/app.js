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
app.use('/user', userRoutes)

app.listen(3001,()=>{
    console.log('Servidor ejecutado en puerto 3001');
});