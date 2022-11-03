import React, { useState , useRef, useEffect, useContext } from 'react';
import { onePokemon } from '../../service/FetchService';
import { LIKE_ADD, LIKE_CLEAR, myContext } from '../../App';

const initialState = {
    // id: 0,
    name: '',
    foto: '',
    like: false
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

            if (stateLike.find( ( pokemon ) => {
                if(pokemon.id == id)
                    return true
            } ));

            setPokemon({id, name, foto});
        } catch (error) {
            
        }
    }


    useEffect(() => {
        
        cargarPokemon();
    }, [])

    const toggleLike = () => {
        if(pokemon.like == true){

            dispatchLike( { 
                type: LIKE_CLEAR , 
                payload: {
                    id: pokemon.id
                }
            });
            
        }else{

            dispatchLike( { 
                type: LIKE_ADD , 
                payload: {
                    id: pokemon.id,
                    name: pokemon.name,
                    foto: pokemon.foto
                }
            });

        }

        setPokemon({...pokemon, like: !pokemon.like})
    }

    return (
        <li 
            className='lista__pokemon-item'
            onClick={ toggleLike }
        >
            <img src= { pokemon.foto } className='lista__item-img' ></img>
            <h3> {pokemon.id } </h3>
            <h4> { pokemon.name } </h4>
            <h5>{ pokemon.like ? 'like' : '' }</h5>
        </li>
    )
}
