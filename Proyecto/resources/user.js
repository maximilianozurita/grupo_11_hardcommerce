const fetch=require("node-fetch")
const endpoint="http://localhost:3005/api/users/hasEmail"

function getEmail() {

    return fetch(endpoint)
        .then(res=> res.json())
}

module.exports={
    getEmail,
}