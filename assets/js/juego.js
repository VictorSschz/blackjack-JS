/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Diamantes)
 * 2H = Two of Diaminds (Corazones)
 * 2S = Two of Spades (Picas)
 */

let baraja = [];
const palos =['C', 'D', 'H', 'S'];
const figuras = ['A', 'J', 'Q', 'K'];


//Referncias HTML

const btnPedir = document.querySelector('#btnPedir');
const cartaJug = document.querySelector('#jugador-cartas');
const puntuacionJug = document.querySelector('small');

let puntosJug = 0,
    puntosCPU = 0;

//Esta función crea una nueva Baraja
const crearBaraja = () =>{

    for (let i = 2; i <= 10; i++) {
        for (const palo of palos) {
            baraja.push(i+palo);
        }
    }

    for (const palo of palos) {
        for (const figura of figuras) {
            baraja.push(figura+palo)
        }
    }

    baraja = _.shuffle(baraja);
    console.log(baraja);
    return baraja;

}

crearBaraja();


//Esta funcion coge una carta

const pedirCarta = () =>{

    if(baraja.length === 0){

        throw 'No hay cartas en la baraja';
    }
    const carta = baraja.shift();

    return carta;

}

const valorCarta = (carta)=>{

    const valor = carta.substring(0, carta.length -1);

    return (isNaN(valor)) ?
                (valor === 'A' ? 11 : 10)
                : valor * 1;
}

// Eventos

btnPedir.addEventListener('click', ()=>{

    const carta = pedirCarta();

    puntosJug += valorCarta(carta);

    puntuacionJug.textContent = puntosJug;

    //cartaJug.appendChild()


});