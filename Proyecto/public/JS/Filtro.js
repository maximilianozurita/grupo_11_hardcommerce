window.addEventListener('load', () => {

const selectBrands=document.querySelectorAll('.brand')
const selectCategorys=document.querySelectorAll('.category')

const BransOfProduct=document.querySelectorAll('.span-brand')
const CategoryOfProduct=document.querySelectorAll('.span-category')

const productContainer=document.querySelectorAll('.separar')

function limpiarFiltro() {
    productContainer.forEach(Container => {
        Container.style.display='flex'
    });
}
function filtrarTodo() {
    productContainer.forEach(Container => {
        Container.style.display='none'
    });
}

//filtrar por marcas
function filtrarMarca() {
    selectBrands.forEach(brand => {
        brand.addEventListener('change', () => {
            if(brand.value=='Todo'){
                limpiarFiltro();
            }
            else{
                filtrarTodo();
                BransOfProduct.forEach((productBrand,i) => {
                    if(productBrand.innerHTML==brand.value){
                        productContainer[i].style.display='flex'
                    }
                });
            }
        })
    });
}

//filtrar por marcas
function filtrarCategoria() {
    selectCategorys.forEach(Category => {
        Category.addEventListener('change', () => {
            if(Category.value=='Todo'){
                limpiarFiltro();
            }
            else{
                filtrarTodo();
                CategoryOfProduct.forEach((productCategory,i) => {
                    if(productCategory.innerHTML==Category.value){
                        productContainer[i].style.display='flex'
                    }
                });
            }
        })
    });
}

/*
//---------------------------Botones header-----------------//

const buttons=document.querySelectorAll('.button-clasificacion')
const buttonClass=document.querySelectorAll('.button-clasificacion .button-clasificacion__descripcion ')

buttons.forEach((button,i) => {
    button.addEventListener('click', () => {
        console.log(buttonClass[i].innerHTML)
        filtrarTodo();
        CategoryOfProduct.forEach((productCategory,i) => {
            if(productCategory.innerHTML==buttonClass[i].innerHTML){
                console.log(productCategory.innerHTML)
                console.log(buttonClass[i].innerHTML)
                productContainer[i].style.display='flex'
            }
        });
    })
})
*/


filtrarMarca()
filtrarCategoria()


})