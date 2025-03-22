
(() => {

    'use strict'

    let baraja = [];
    const palos = ['C', 'D', 'H', 'S'],
          figuras = ['A', 'J', 'Q', 'K'];


    //Referncias HTML

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntuacion = document.querySelectorAll('small');

    let puntosJugadores = [];

    const iniciarJuego = (numJug = 2) =>{
        baraja = crearBaraja();

        for (let i = 0; i < numJug; i++) {
            
            puntosJugadores.push(0);
        }
    }

    //Esta función crea una nueva Baraja
    const crearBaraja = () => {

        baraja = [];

        for (let i = 2; i <= 10; i++) {
            for (const palo of palos) {
                baraja.push(i + palo);
            }
        }

        for (const palo of palos) {
            for (const figura of figuras) {
                baraja.push(figura + palo)
            }
        }

        return baraja = _.shuffle(baraja);

    }

    //Esta funcion coge una carta
    const pedirCarta = () => {

        if (baraja.length === 0) {

            throw 'No hay cartas en la baraja';
        }
        
        return baraja.shift();
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A' ? 11 : 10)
            : valor * 1;
    }

    //Turno 0 = p1 y el ultimo es la cpu
    const acumularPuntos = (carta, turno)=> {

        puntosJugadores[turno] += valorCarta(carta);
        puntuacion[turno].textContent = puntosJugadores[turno];

        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) =>{

        const nuevaCarta = document.createElement('img');
              nuevaCarta.classList.add("carta");
              nuevaCarta.src = `assets/cartas/${carta}.png`
              divCartasJugadores[turno].appendChild(nuevaCarta);
    }

    // Turno computadora
    const turnoCPU = (puntosJugador) => {

        let puntosCPU = 0;

        do {
            const carta = pedirCarta();
            puntosCPU = acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, puntosJugadores.length -1);
            // const nuevaCarta = document.createElement('img');
            // nuevaCarta.classList.add("carta");
            // nuevaCarta.src = `assets/cartas/${carta}.png`
            // cartaCPU.appendChild(nuevaCarta);

            if (puntosJugador > 21) {
                break;
            }

        } while ((puntosCPU < puntosJugador) && (puntosJugador <= 21));

        setTimeout(() => {

            if (puntosCPU === puntosJugador) {
                alert('EMPATE');
            } else if (puntosJugador > 21) {
                alert('GANA LA CPU');
            } else if (puntosCPU > 21) {
                alert('GANA JUGADOR');
            } else {
                alert('GANA CPU');
            }

        }, 50);
    }

    // Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJug = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        // const nuevaCarta = document.createElement('img');
        // nuevaCarta.classList.add("carta");
        // nuevaCarta.src = `assets/cartas/${carta}.png`
        // cartaJug.appendChild(nuevaCarta);

        if (puntosJug > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCPU(puntosJug);
        } else if (puntosJug === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCPU(puntosJug);
        }
    });

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCPU(puntosJug);
    })

    btnNuevo.addEventListener('click', () => {

        iniciarJuego();

        crearBaraja();

        // btnPedir.disabled = false;
        // btnDetener.disabled = false;

        // cartaJug.innerHTML = '';
        // cartaCPU.innerHTML = '';

    })
})();