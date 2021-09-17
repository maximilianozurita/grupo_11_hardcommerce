window.addEventListener('load', () => {

//--------------------Main Carrusel----------------------------//
    let mainCarruselPosition=0;

    function contador(){
        const contenedorMainCarrusel=document.querySelector('.carrusel-productos__producto')
        mainCarruselPosition-=25;
        if(mainCarruselPosition<-75){
            mainCarruselPosition=0;
        }
        contenedorMainCarrusel.style.transform='translateX('+mainCarruselPosition+'%)'
    }
    setInterval(contador,4000);


//---------------------Ofertas----------------------------------//
const contenedorOfertas=document.querySelector('.ofertas')
const buttonOffLH=document.querySelector('.button-off-LH')
const buttonOffRH=document.querySelector('.button-off-RH')

let posicion=0;

buttonOffLH.addEventListener('click',()=>{
    posicion+=12.5;
    if(posicion>0){
        posicion=-50
    }
    contenedorOfertas.style.transform='translateX('+posicion+'%)'
})
buttonOffRH.addEventListener('click',()=>{
    posicion-=12.5;
    if(posicion<-50){
        posicion=0
    }
    contenedorOfertas.style.transform='translateX('+posicion+'%)'
})


//-------------------------------Destacados----------------------------------------//
const contenedorDestacados=document.querySelector('.destacados')
const buttonDestLH=document.querySelector('.button-dest-LH')
const buttonDestRH=document.querySelector('.button-dest-RH')


buttonDestLH.addEventListener('click',()=>{
    posicion+=12.5;
    if(posicion>0){
        posicion=-50
    }
    contenedorDestacados.style.transform='translateX('+posicion+'%)'
})
buttonDestRH.addEventListener('click',()=>{
    posicion-=12.5;
    if(posicion<-50){
        posicion=0
    }
    contenedorDestacados.style.transform='translateX('+posicion+'%)'
})



})