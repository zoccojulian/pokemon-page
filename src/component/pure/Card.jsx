import React, { useState , useRef, useEffect, useContext } from 'react';
import { onePokemon } from '../../service/FetchService';
import { myContext } from '../../App';

const initialState = {
    // id: 0,
    name: '',
    foto: ''
};

export default function Card( { name } ) {
    
    //contexto para ver si el pokemon esta en los likes, y sacarlo o ponerlo
    const { stateLike, dispatchLike } = useContext(myContext);

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
        <li className='lista__pokemon-item'>
            <img src= { pokemon.foto } className='lista__item-img' ></img>
            <h3> {pokemon.id } </h3>
            <h4> { pokemon.name } </h4>
        </li>
    )
}
