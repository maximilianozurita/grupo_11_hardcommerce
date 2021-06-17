//const { json } = require('express');
const fs=require('fs');
const path=require ("path");

module.exports={
    filename: path.resolve(__dirname, '../data/usersData.json'),

    readFile(){
        const usersPath = this.filename;
        const usersJson = fs.readFileSync(usersPath,"utf-8");
        return JSON.parse(usersJson);
    },
    writeFile(newData){
        const dataJson = JSON.stringify(newData, null,2);
        fs.writeFileSync(this.filename,dataJson);
    },
    generateId(){
        const users = this.readFile();
        const lastUser = users.pop();
        return lastUser.id + 1;
    },
    findAll(){
        const users = this.readFile();
        return users;
    },
    findByPk(id){
        const users = this.readFile();
        const userFound = users.find(user => user.id == id);
        return userFound;
    },
    create(user) {
        user.id= this.generateId();
        const users = this.readFile();
        const usersUpdated = [...users,user];
        this.writeFile(usersUpdated);
        return user;
    },
    update(data, id) {
        const users = this.readFile();

        const newUsers = users.map(user => {
            if(user.id == id){
                user = {
                    id: user.id,
                    ...data
                }
            }
            return user;
        });
        this.writeFile(newUsers);
    },
    destroy(id) {
        const users = this.readFile();

        const newUsers = users.filter(user => user.id != id);

        this.writeFile(newUsers);
    }

}