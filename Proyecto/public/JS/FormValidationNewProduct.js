window.addEventListener('load', () => {

    let form=document.querySelector(".formulario");

    let inputName=document.querySelector("#name");
    let inputProductDescription=document.querySelector("#product_description");
    let inputShortDescription=document.querySelector("#short_description");
    let inputStock=document.querySelector("#stock");
    let inputCategory=document.querySelector("#category");
    let inputBrand=document.querySelector("#brand");
    let inputPrice=document.querySelector("#price");
    let inputQuota=document.querySelector("#quota");
    
    let inputArray=[
        inputName,
        inputProductDescription,
        inputShortDescription,
        inputStock,
        inputCategory,
        inputBrand,
        inputPrice,
        inputQuota
    ]

    let errorName=document.querySelector(".msg-error-name");
    let errorProductDescription=document.querySelector(".msg-error-product_description");
    let errorShortDescription=document.querySelector(".msg-error-short_description");
    let errorStock=document.querySelector(".msg-error-stock");
    let errorCategory=document.querySelector(".msg-error-category");
    let errorBrand=document.querySelector(".msg-error-brand");
    let errorPrice=document.querySelector(".msg-error-price");
    let errorQuota=document.querySelector(".msg-error-quota");

    let errorArray=[
        errorName,
        errorProductDescription,
        errorShortDescription,
        errorStock,
        errorCategory,
        errorBrand,
        errorPrice,
        errorQuota
    ];
    
    inputName.focus ();

    function resetError(){
        errorArray.forEach(error => {
            error.innerHTML=""
        });
    }

    function validateForm(e){
        
        resetError()

        let hasError=false;

        if(inputName.value.length==0){
            errorName.innerHTML="Por favor ingrese un nombre de producto"
         
            if (!hasError) {
                inputName.focus()
        }
        hasError=true
        
        }
        if(inputProductDescription.value.length==0){
            errorProductDescription.innerHTML="Por favor ingrese una descripcion de producto"
            if (!hasError) {
                inputProductDescription.focus()
            }
            
            
            hasError=true;
        }
        
        if(inputShortDescription.value.length==0){
            errorShortDescription.innerHTML="Por favor ingrese una descripcion corta de producto"
            
            if (!hasError) {
                inputShortDescription.focus()
            }
            
            hasError=true;
        }

        if(inputStock.value.length==0){
            errorStock.innerHTML="Por favor ingrese una descripcion corta de producto"
           
           if (!hasError) {
               inputStock.focus ()
           }
            hasError=true;
        }

        if(inputCategory.value.length==0){
            errorCategory.innerHTML="Por favor seleccione una categoria"
            if (!hasError) {
                inputCategory.focus ()
            }
            
            hasError=true;
        }

        if(inputBrand.value.length==0){
            errorBrand.innerHTML="Por favor seleccione una marca"
            
            if (!hasError){
                inputBrand.focus ()
            }
            
            hasError=true;
        }

        if(inputPrice.value.length==0){
            errorPrice.innerHTML="Por favor ingrese un precio"
            
            if (!hasError) {
                inputPrice.focus ()
            }
            hasError=true;
        }

        if(inputQuota.value.length==0){
            errorQuota.innerHTML="Por favor seleccione una cuota"
            
            if(!hasErrore) {
                inputQuota.focus ()
            }
            hasError=true;
        }

        if (hasError) {
            e.preventDefault()
        }

    }


    inputArray.forEach(input => {
        input.addEventListener("blur",validateForm);
    });

    form.addEventListener("submit",validateForm);


})