var rondas=document.getElementById("rondas")
var eleccion=document.getElementById("contenedorEleccion")
var contenedor=document.getElementById("contenedor")
var imagen1=document.getElementById("respuesta1")
var botones1=document.getElementById("botones1")
var imagen2=document.getElementById("respuesta2")
var botones2=document.getElementById("botones2")
var salida=document.getElementById("salida")
var btnCalcular=document.getElementById("calcular")
var btnReiniciar=document.getElementById("reiniciar")
var puntuacion1=document.getElementById("puntuacion1")
var puntuacion2=document.getElementById("puntuacion2")
var puntaje1=0
var puntaje2=0
var bot=""
function jugador(jugador){
    if(jugador===0){
        bot="robot"
        botones2.style.display="none"
    }else if(jugador===1){
        bot=""
    }
    setTimeout(function(){
        eleccion.style.display="none"
        contenedor.style.display="flex"
    },200)
}
var primerJugador=""
function eleccion1(num){
    
    if(num==0){
        imagen1.src="img/rock.svg"
        imagen1.style.display="inline"
        botones1.style.display="none"
        primerJugador="piedra"
    }else if(num==1){
        imagen1.src="img/paper.svg"
        imagen1.style.display="inline"
        botones1.style.display="none"
        primerJugador="papel"
    }else if(num==2){
        imagen1.src="img/scissors.svg"
        imagen1.style.display="inline"
        botones1.style.display="none"
        primerJugador="tijera"
    }
    imagen1.style.visibility="hidden"
    if (bot=="robot"){
        robot()
        botones2.style.display="none"
    }
    return primerJugador
}
var segundojugador=""
function eleccion2(num){
    if(num==0){
        imagen2.src="img/rock.svg"
        imagen2.style.display="inline"
        botones2.style.display="none"
        segundojugador="piedra"
    }else if(num==1){
        imagen2.src="img/paper.svg"
        imagen2.style.display="inline"
        botones2.style.display="none"
        segundojugador="papel"
    }else if(num==2){
        imagen2.src="img/scissors.svg"
        imagen2.style.display="inline"
        botones2.style.display="none"
        segundojugador="tijera"
    }
    imagen2.style.visibility="hidden"
    return segundojugador
}

function calcular(){
    imagen1.style.visibility="visible"
    imagen2.style.visibility="visible"
    if(primerJugador==segundojugador){
        salida.innerText="empate"
        puntaje1=puntaje1+0.5
        puntaje2=puntaje2+0.5
    } else if (primerJugador === "piedra") {

        if (segundojugador === "papel"){
            puntaje2=puntaje2+1
            salida.innerText="jugador 2 gana"
        } else if (segundojugador === "tijera"){
            puntaje1=puntaje1+1
            salida.innerText="jugador 1 gana"
        }
    } else if (primerJugador === "papel") {

        if (segundojugador === "tijera") {
            puntaje2=puntaje2+1
            salida.innerText="jugador 2 gana"
        };
        if (segundojugador === "piedra") {
            puntaje1=puntaje1+1
            salida.innerText="jugador 1 gana"
        };

    } else if (primerJugador === "tijera") {

        if (segundojugador === "piedra") {
            puntaje2=puntaje2+1
            salida.innerText="jugador 2 gana"
        };
        if (segundojugador === "papel") {
            puntaje1=puntaje1+1
            salida.innerText="jugador 1 gana"
        };

    }
    puntuacion1.value=puntaje1
    puntuacion2.value=puntaje2
    if (puntaje1>(rondas.value/2) || puntaje2>(rondas.value/2) || (puntaje1+puntaje2)==rondas.value){
        if(puntaje1==puntaje2){
            salida.innerText="empate!"
        }else if(puntaje1>puntaje2){
            salida.innerText="ganador jugador 1"
        }else{
            salida.innerText="ganador jugador 2"
        }
        btnReiniciar.style.display="inline"
        btnCalcular.style.display="none"
    }else{
        primerJugador='1'
        segundojugador='2'
        setTimeout(function(){
            imagen1.style.display="none"
            imagen2.style.display="none"
            botones1.style.display="flex"
            if(bot=="robot"){
                botones2.style.display="none"
            }else{
                botones2.style.display="flex"
            }
            
            salida.innerHTML="vs"
        },1000)
    }
    
}

function reiniciar(){
    puntaje1=0
    puntaje2=0
    puntuacion1.value=puntaje1
    puntuacion2.value=puntaje2
    contenedor.style.display="none"
    eleccion.style.display="flex"
    btnReiniciar.style.display="none"
    btnCalcular.style.display="inline"
    imagen1.style.display="none"
    imagen2.style.display="none"
    botones1.style.display="flex"
    botones2.style.display="flex"
    salida.innerText="vs"
}

function robot(){
    var indice = Math.floor(Math.random() * 3)
    eleccion2(indice)
}