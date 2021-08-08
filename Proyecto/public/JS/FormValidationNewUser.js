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

    function resetError(){
        errorArray.forEach(error => {
            error.innerHTML=""
        });
    }

    function validateForm(e){
        resetError()

        let hasError=false;

        if(inputName.value.length<4){
            errorName.innerHTML="Por favor ingrese un nombre mayor a 3 caracteres"
            hasError=true;
        }

        if(inputLastName.value.length<4){
            errorLastName.innerHTML="Por favor ingrese un apellido mayor a 3 caracteres"
            hasError=true;
        }
        
        if(!inputPassword.value.length>0){
            errorPassword.innerHTML="Por favor ingrese un password"
            hasError=true;
        }

        if(!inputCell.value.length>0){
            errorCell.innerHTML="Por favor ingrese un numero de celular"
            hasError=true;
        }
        if(!inputImage.value){
            errorImage.innerHTML="Por favor ingrese un numero de celular"
            hasError=true;
        }

        /*
        inputEmail,
        */
        console.log(hasError)
        if (hasError) {
            e.preventDefault()
        }

    }


    inputArray.forEach(input => {
        input.addEventListener("blur",validateForm);
    });

    form.addEventListener("submit",validateForm);


})