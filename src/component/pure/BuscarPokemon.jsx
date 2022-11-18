import React, { useState , useRef } from 'react';
import { onePokemon } from '../../service/FetchService';
import Card from './Card';
import '../../scss/buscar.scss';

import imagenPikachu from '../../assets/imagen_error/pikachu_llorando.png'

const estadoInicial = {
        encontrado: false,
        textoError:'',
        nombre: ''
}


export default function BuscarPokemon() {

    // const [pokemon, setPokemon] = useState(estadoInicial);

    const [pokemon, setPokemon] = useState(estadoInicial);
    const [buscando, setBuscando] = useState(false);

    const idRef = useRef();

    const buscarPokemon = async ( id ) => {

        try {

            const pokemonPrueba = await onePokemon(id);
            const nombre = pokemonPrueba.name ;
            // const url = pokemonPrueba.sprites.other['official-artwork'].front_default;
            setPokemon({ encontrado: true, textoError:'' ,nombre});
            setBuscando(false)
        } catch (error) {
            setPokemon({ encontrado:false, textoError:'No se econtró ningún pokemon',nombre: '' });
            setBuscando(false);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        setPokemon({encontrado: false, textoError:''});
        setBuscando(true);
        buscarPokemon(idRef.current.value);
    }

    return (
        <div className='buscar'>
            <form onSubmit={ submit } className='buscar__form'>
                <input
                    placeholder='Número / Nombre'
                    ref={ idRef }
                    className='buscar__form-input'
                ></input>
                <button  type='submit' className='buscar__form-buttom'>
                GO!
                </button>
            </form>
            { buscando && <span>BUSCANDO...</span>}
            { pokemon.textoError !== '' && 
                <div className='error__container'>
                    <span>{ pokemon.textoError }</span>
                    <img
                    src={ imagenPikachu }
                    ></img>
                </div>
             }
            { pokemon.encontrado  && 
            <Card 
                scroll = {{
                    windowInner: window.innerHeight, 
                    documentElement: document.documentElement.clientHeight  
                }}
             name= { pokemon.nombre }></Card>}
        </div>
    )
}
