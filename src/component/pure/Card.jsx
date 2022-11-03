import React, { useState , useRef, useEffect } from 'react';
import { onePokemon } from '../../service/FetchService';

const initialState = {
    id: 0,
    name: '',
    foto: ''
};

export default function Card( { name } ) {
    
    const [pokemon, setPokemon] = useState(initialState);

    const cargarPokemon = async () => {
        try {
            
            const datosPokemon = await onePokemon(name);
            const id = datosPokemon.id;
            const nombre = datosPokemon.forms[0].name ;
            const foto = datosPokemon.sprites.other.dream_world.front_default

            setPokemon({id, name, foto});
        } catch (error) {
            
        }
    }


    useEffect(() => {
        
        cargarPokemon();

    }, [])

    return (
        <div>
            <img src= { pokemon.foto } ></img>
            <h3> {pokemon.id } </h3>
            <h4> { pokemon.name } </h4>
        </div>
    )
}
