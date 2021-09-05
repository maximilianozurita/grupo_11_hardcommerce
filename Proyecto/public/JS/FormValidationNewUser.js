function hasEmail(email) {


    const endpoint = 'http://localhost:3005/api/users/hasEmail';
    const data = {email: email};

    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
}

window.addEventListener('load', () => {
    let form=document.querySelector(".formulario");

    let inputName=document.querySelector("#name");
    let inputLastName=document.querySelector("#lastName");
    let inputEmail=document.querySelector("#email");
    let inputPassword=document.querySelector("#password");
    let inputCell=document.querySelector("#cell");
    let inputImage=document.querySelector("#image");

    let inputArray=[
        inputName,
        inputLastName,
        inputEmail,
        inputPassword,
        inputCell,
        inputImage
    ]

    let errorName=document.querySelector(".msg-error-name");
    let errorLastName=document.querySelector(".msg-error-lastName");
    let errorEmail=document.querySelector(".msg-error-email");
    let errorPassword=document.querySelector(".msg-error-password");
    let errorCell=document.querySelector(".msg-error-cell");
    let errorImage=document.querySelector(".msg-error-image");

    let errorArray=[errorName,errorLastName,errorEmail,errorPassword,errorCell,errorImage];


    //ingresa automaticamente al primer input.
    inputName.focus ();

    //funcion que valida que sea unicamente numeros.
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    //funcion que valida que tenga formato email.
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //resetea todos los msj de errores previos.
    function resetError(){
        errorArray.forEach(error => {
            error.innerHTML=""
        });
    }


    // funcion que tiene la logica de validacion.
   function validateForm(e){


        let hasError=false;

        resetError()

        if(inputName.value.length<4){

            hasError=true;
            errorName.innerHTML="Por favor ingrese un nombre mayor a 3 caracteres"

        }

        if(inputLastName.value.length<4){
            errorLastName.innerHTML="Por favor ingrese un apellido mayor a 3 caracteres"

            hasError=true;
        }

        var isEmail;
        hasEmail(inputEmail.value)
             .catch(error => {
                 isEmail=true
                 errorEmail.innerHTML="Error de servidor, intentelo mas tarde"
            })
            .then(response => {

                isEmail=response.data.hasEmail

                if(isEmail){
                    errorEmail.innerHTML="email existente, ingrese uno nuevo"

                    hasError=true;
                }
            });

        if( !validateEmail (inputEmail.value) ){
            errorEmail.innerHTML="Por favor ingrese su email"

            hasError=true;
        }

        if(!inputPassword.value.length>0){
            errorPassword.innerHTML="Por favor ingrese un password"
            hasError=true;
        }

        if(!isNumeric(inputCell.value) || inputCell.value.length < 10){
            errorCell.innerHTML="Por favor ingrese un numero de celular"
            hasError=true;
        }
        if(!inputImage.value){

            errorImage.innerHTML="Por favor ingrese una imagen"

            hasError=true;

        }

        if (hasError) {
            e.preventDefault()
        }

    }


    inputArray.forEach(input => {
        input.addEventListener("blur",validateForm);
    });

    form.addEventListener("submit",validateForm)

})
