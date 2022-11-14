import React from 'react';

//Imagenes
import pokebola from '../../assets/pokebola/pokebola.png';
import pokebolaCentro from '../../assets/pokebola/pokebola_aroInterno.png';

import '../../scss/pokebola.scss';


export default function Pokebola() {

    return (
        <div className='pokebola'>
            <img
                src={ pokebola }
                className='pokebola-fondo'
            ></img>
            <img
                src={ pokebolaCentro }
                className='pokebola-centro'
            ></img>
        </div> 
    )
}
