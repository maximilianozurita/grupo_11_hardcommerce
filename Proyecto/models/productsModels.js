const { json } = require('express');
const fs=require('fs');
const path=require ("path");

module.exports={
    filename: path.resolve(__dirname, '../data/productsData.json'),
    
    readFile() {
        // Leer nuestra informacion
        const productsPath = this.filename;
        const productsJson = fs.readFileSync(productsPath, 'utf-8');
        // Parsear la informacion
        return JSON.parse(productsJson);
    },
    writeFile(newData) {
        // Pasar la data a json
        const dataJson = JSON.stringify(newData, null, 2);
        // Escribir el archivo
        fs.writeFileSync(this.filename, dataJson);
    },
    generateId() {
        const products = this.readFile();
        const lastProduct = products.pop();
        return lastProduct.id + 1;
    },
    findAll() { //------>>Ver si es necesario (Se reutiliza readFile)
        // Leer nuestra informacion
        const products = this.readFile();
        // devolver la info
        return products;
    },
    findByPk(id) {
        const product = this.readFile();
        // Filtrar por el ID
        const productFound = product.find(product => product.id == id);
        // Devolvemos el producto
        return productFound;
    },
    create(product) {
        product.id = this.generateId();
        // Leer el archivo
        const products = this.readFile();
        // Agregar nuestro producto al array de productos
        const productsUpdated = [...products, product];
        // Volver a escribir el archivo con el nuevo array de productos
        this.writeFile(productsUpdated);
        return product;
    },
    update(data, id) {
        const products = this.readFile();
        const newProducts=products.map(product=>{  
            if(product.id==id){
                    product={
                        id: product.id,
                        ...data
                    }
                }
            return product
        })

        this.writeFile(newProducts);
    },
    destroy(id) {
        const products = this.readFile();

        const newProducts = products.filter(product => product.id!= id);

        
        //Eliminar imagen
        const deletedProduct=products.find(product=>{
            if(product.id==id){
                return product
            }
        });

        fs.unlinkSync((__dirname, '../public/images/imgProducts/') + deletedProduct.image1); 
    
        this.writeFile(newProducts);
    }

}
