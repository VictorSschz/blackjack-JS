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
const btnDetener = document.querySelector('#btnDetener');
const cartaJug = document.querySelector('#jugador-cartas');
const cartaCPU = document.querySelector('#cpu-cartas');
const puntuacion = document.querySelectorAll('small');

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

// Turno computadora

const turnoCPU = (puntosJugador) => {

    do{
        const carta = pedirCarta();

        puntosCPU += valorCarta(carta);

        puntuacion[1].textContent = puntosCPU;
        
        const nuevaCarta = document.createElement('img');
        nuevaCarta.classList.add("carta");
        nuevaCarta.src =`/assets/cartas/${carta}.png`
        cartaCPU.appendChild(nuevaCarta);

        if(puntosJugador > 21){
            break;
        }

    }while((puntosCPU < puntosJugador) && (puntosJugador <= 21));

    setTimeout(() => {

        if(puntosCPU === puntosJugador){
            alert('EMPATE');
        }else if(puntosJug > 21){
            alert('GANA LA CPU');
        }else if(puntosCPU > 21){
            alert('GANA JUGADOR');
        }else{
            alert('GANA CPU');
        }
        
    }, 20);
}

// Eventos

btnPedir.addEventListener('click', ()=>{

    const carta = pedirCarta();

    puntosJug += valorCarta(carta);

    puntuacion[0].textContent = puntosJug;
    
    const nuevaCarta = document.createElement('img');
    nuevaCarta.classList.add("carta");
    nuevaCarta.src =`/assets/cartas/${carta}.png`
    cartaJug.appendChild(nuevaCarta);

    if(puntosJug > 21){
        btnPedir.disabled = true;
        btnDetener.disabled  = true;
        turnoCPU(puntosJug);
    }else if(puntosJug === 21){
        btnPedir.disabled = true;
        btnDetener.disabled  = true;
        turnoCPU(puntosJug);
    }
});

btnDetener.addEventListener('click', ()=>{
   
    btnPedir.disabled  = true;
    btnDetener.disabled  = true;
    turnoCPU(puntosJug);
})