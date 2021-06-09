const { json } = require('express');
const fs=require('fs');
const path=require ("path");

module.exports={
    filename: path.resolve(__dirname, '../data/usersData.json'),

    readFile(){
        const usersPath = this.filename;
        const usersJson = fs.readFileSync(usersPath,"utf-8");
        return JSON.parse(usersJson);
    },
    findAll(){
        const users = this.readFile();
        return users;
    }
}