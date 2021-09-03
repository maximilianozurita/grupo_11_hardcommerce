window.addEventListener('load', () => {

    

let form = document.querySelector (".formulario");

let inputEmail = document.querySelector ("#email");
let inputPassword = document.querySelector ("#password");

let inputArray = [
    inputEmail, inputPassword
];

let errorEmail = document.querySelector (".msg-error-email");
let errorPassword = document.querySelector (".msg-error-password");

let errorArray = [
    errorEmail, errorPassword
];




function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function resetErrors(){
    errorArray.forEach(error => {
        error.innerHTML = ""
    });
}


function validateForm(e){ 
    resetErrors ()

    let hasError=false;

    // email

    if (!validateEmail (inputEmail.value) ) {
   
        errorEmail.innerHTML = "Escriba su email "
        hasError= true;
        inputEmail.focus()

    }

    // password

    if ( !inputPassword.value) {
        errorPassword.innerHTML="Por favor ingrese un password"
      
       if (!hasErrors) {
        inputPassword.focus()
       }

       hasErrors = true

    }

    if (hasError) {
        e.preventDefault()
    }


}

});

inputArray.forEach(input => {
    input.addEventListener("blur",validateForm);



form.addEventListener("submit",validateForm);


})










