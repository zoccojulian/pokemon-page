import React, { useState , useRef } from 'react';
import { onePokemon } from '../../service/FetchService';

const estadoInicial = {
    nombre: '',
    url:''
}


export default function BuscarPokemon() {

    const [pokemon, setPokemon] = useState(estadoInicial);

    const idRef = useRef();

    const probar = async ( id ) => {

        try {

            const pokemonPrueba = await onePokemon(id);
            console.log(pokemonPrueba.sprites.other.dream_world.front_default)
            console.log(pokemonPrueba.forms[0].name)

            
            const nombre = pokemonPrueba.forms[0].name ;
            const url = pokemonPrueba.sprites.other['official-artwork'].front_default;
            setPokemon({ nombre, url });
            
        } catch (error) {
            console.log('error')
        }
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(idRef.current.value)
        probar(idRef.current.value);
    }

    return (
        <div>
            <img src= { pokemon.url } ></img>
            <h1> { pokemon.nombre } </h1>
            <form onSubmit={ submit }>
                <input
                    placeholder='Numero de Pokemon'
                    ref={ idRef }
                ></input>
                <button  type='submit'>
                POKEMON
            </button>
            </form>
            
        </div>
    )
}
