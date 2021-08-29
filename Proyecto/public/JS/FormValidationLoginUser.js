window.addEventListener('load', () => {

let form = document.querySelector (".formulario");

let inputEmail = document.querySelector ("#email");
let inputPassword = document.querySelector ("#password");

let inputArray = [
    inputEmail, inputPassword
];

let errorEmail = document.querySelector (".msg-error-email");
let errorPassword = document.querySelector (".msg-error-password");

let inputArray = [
    errorEmail, errorPassword
];


function resetErrors(){
    errorArray.forEach(error => {
        error.innerHTML = ""
    });
}

form.addEventListener("submit", (e) =>{
    hasErrors = false

    resetErrors ()

    // email

    if (!inputEmail.value) {
        hasErrors = true
        errorName.innerHTML = "Escriba su email"
    }

    // password

    if (!inputPassword.value) {
        hasErrors=true;
        errorPassword.innerHTML="Por favor ingrese un password11111"

    }

    if (hasErrors) {
        e.preventDefault()
    }

})









})