import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function InfoPokemon() {


    const history = useNavigate();

    const volver = () => {
        history(-1);
    }

    return (
        <div>
            <span
            style={ { fontSize : '3rem' }}
            >EN CONSTRUCCION</span>
            <button
                onClick={ volver }
                style= { { fontSize: '2rem' } }
            >
                Volver
            </button>
        </div>
    )
}
