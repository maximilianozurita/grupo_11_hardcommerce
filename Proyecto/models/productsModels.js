const { json } = require('express');
const fs=require('fs');

//Leer archivo
const file= fs.readFileSync(__dirname + '/productsData.json');

//Parsear archivo json
const jsonfile = JSON.parse(file)

module.exports={

    findAll(){
        return jsonfile.products
    },

    findByPk(id){
        return jsonFile.products.find(products=>Number(products.id)==Number(id))
    }
}