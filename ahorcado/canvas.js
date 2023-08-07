var screen = document.querySelector("canvas");
var brush = screen.getContext("2d");
var ancho = screen.width;
var alto = screen.height;

var tamanoPalabra;
var tamanoFuente;
var salvado;

//Función que inicia el dibujo
function iniciarDibujo(palabra) {
    limpiarPantalla(0, 0, ancho, alto);
    dibujarBaseMastil(0.25, 0.55);
    tamanoPalabra = palabra.length;
    tamanoFuente = (ancho / tamanoPalabra);
    if (tamanoFuente > 40) {
        tamanoFuente = 40;
    }
}

//LIMPIAR PANTALLA
function limpiarPantalla(x, y, ancho, alto) {
    brush.clearRect(x, y, ancho, alto);
}

//CALCULAR CANTIDAD DE LINEAS PARA LA PALABRA SECRETA
function calcularLineas() {
    var lineas = "";
    for (var i = 0; i < tamanoPalabra; i++) {
        lineas = lineas + "_";
        if (i != tamanoPalabra - 1) {
            lineas = lineas + " ";
        }
    }
    return lineas;
}

//SOBREESCRIBIR LETRAS EN LINEAS
function transcribirLetra(lineas, tecla) {
    var lineasArray = lineas.split("");
    for (var i = 0; i < tamanoPalabra; i++) {
        if (tecla == palabra[i]) {
            lineasArray.splice(i * 2, 1, tecla);
        }
    }
    return lineasArray.join("");
}

//ESCRIBIR LINEAS Y LETRAS CORRECTAS
function escribirLetrasCorrectas(lineas) {
    brush.fillStyle = "black";
    brush.strokeStyle = "black";
    brush.font = "bold " + "40px Playfair Display";
    brush.textAlign = "center";
    brush.beginPath();
    brush.fillText(lineas, ancho * 0.59, alto * 0.90);
    brush.fill();
}

//ESCRIBIR LETRAS INCORRECTAS
function escribirLetraIncorrectas(letrasIncorrectas) {
    brush.fillStyle = "white";
    brush.strokeStyle = "white";
    brush.font = "bold " + (tamanoFuente * 0.70) + "px Playfair Display";
    brush.textAlign = "150px";
    brush.beginPath();
    brush.fillText(letrasIncorrectas.join(" "), ancho * 0.59, alto * 0.7);
    brush.fill();
}

//ESCRIBIR PALABRA CORRECTA
function palabraCorrecta() {
    brush.fillStyle = "black";
    brush.strokeStyle = "black";
    brush.font = "bold 15px Playfair Display";
    brush.textAlign = "center";
    brush.beginPath();
    brush.fillText("La palabra correcta era " + palabra, ancho * 0.59, alto * 0.95);
    brush.fill();
}

//DIBUJAR ERRORES
function dibujarErrores(errores) {
    if (errores <= 3) {
        dibujarMastil(0.36, 0.47, errores);
    } else {
        dibujarHombrecito(0.70, 0.24, errores);
    }
}

//DIBUJAR BASE 
function dibujarBaseMastil(x, y) {
    brush.strokeStyle = "black";
    brush.lineWidth = 6;
    brush.beginPath();
    brush.moveTo(ancho * x, alto * y);
    brush.lineTo(ancho * (x + 0.25), alto * y);
    brush.lineTo(ancho * (x + 0.11), alto * (y - 0.08));
    brush.lineTo(ancho * x, alto * y);
    brush.lineTo(ancho * (x + 0.2), alto * y);
    brush.stroke();
}

//DIBUJAR RESTO DE LA HORCA
function dibujarMastil(x, y, parte) {
    brush.strokeStyle = "black";
    brush.lineWidth = 6;
    switch (parte) {
        case 1: //mastil vertical
            brush.beginPath();
            brush.moveTo(ancho * x, alto * y);
            brush.lineTo(ancho * x, alto * (y - 0.3));
            brush.stroke();
            break;
        case 2: //mastil horizontal
            brush.beginPath();
            brush.moveTo(ancho * x, alto * (y - 0.3));
            brush.lineTo(ancho * (x + 0.35), alto * (y - 0.3));
            brush.stroke();
            break;
        case 3: //soga
            brush.beginPath();
            brush.lineTo(ancho * (x + 0.34), alto * (y - 0.3));
            brush.lineTo(ancho * (x + 0.34), alto * (y - 0.265));
            brush.stroke();
            break;
    }
}

//DIBUJAR HOMRECITO
function dibujarHombrecito(x, y, parte) {
    brush.strokeStyle = "black";
    brush.lineWidth = 6;
    switch (parte) {
        case 4: //cabeza
            brush.beginPath();
            brush.arc(ancho * x, alto * y, 18, 0, 2 * Math.PI);
            brush.stroke();
            break;
        case 5: //cuerpo
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.036));
            brush.lineTo(ancho * x, alto * (y + 0.15));
            brush.stroke();
            break;
        case 6: //brazo izquierdo
            if (salvado) {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.065));
                brush.lineTo(ancho * (x - 0.08), alto * (y + 0.01));
                brush.stroke();
                break;
            } else {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.06));
                brush.lineTo(ancho * (x - 0.05), alto * (y + 0.12));
                brush.stroke();
                break;
            }
        case 7: //brazo derecho
            if (salvado) {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.065));
                brush.lineTo(ancho * (x + 0.08), alto * (y + 0.01));
                brush.stroke();
                break;
            } else {
                brush.beginPath();
                brush.lineTo(ancho * x, alto * (y + 0.06));
                brush.lineTo(ancho * (x + 0.05), alto * (y + 0.12));
                brush.stroke();
                break;
            }
        case 8: //pierna derecha
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.15));
            brush.lineTo(ancho * (x + 0.04), alto * (y + 0.25));
            brush.stroke();
            break;
        case 9: //piernza izquierda
            salvado = false;
            brush.beginPath();
            brush.lineTo(ancho * x, alto * (y + 0.15));
            brush.lineTo(ancho * (x - 0.04), alto * (y + 0.25));
            brush.stroke();
            break;
    }
}


//DIBUJAR HOMBRECITO SALVADO
function hombrecitoSalvado() {
    salvado = true;
    limpiarPantalla(0, 0, ancho , alto * 0.58);
    dibujarHombrecito(0.62, 0.3, 4);
    dibujarHombrecito(0.62, 0.3, 5);
    dibujarHombrecito(0.62, 0.3, 6);
    dibujarHombrecito(0.62, 0.3, 7);
    dibujarHombrecito(0.62, 0.3, 8);
    dibujarHombrecito(0.62, 0.3, 9);
}

//ESCRIBIR Y ANIMAR PALABRA
function escribir(palabra) {
    var color = "black";
    var time = setInterval(function () {
        if (!iniciarJuego) {
            brush.clearRect(0, 0, ancho, alto * 0.11);
            brush.font = "bold 40px Playfair Display";
            brush.textAlign = "";
            brush.beginPath();
            brush.fillText(palabra, ancho * 0.62, alto * 0.11);
            brush.fill();
            brush.stroke();
        } else {
            clearInterval(time);
        }
    }, 500);
}
