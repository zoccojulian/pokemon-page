import React, { useState , useRef , useEffect } from 'react';
import { allPokemon, onePokemon } from '../../service/FetchService';
import Card from './Card';
import '../../scss/buscar.scss';

import imagenPikachu from '../../assets/imagen_error/pikachu_llorando.png';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const estadoInicial = {
        encontrado: false,
        textoError:'',
        nombre: ''
}


export default function BuscarPokemonAutocomplete() {

    const [listaPokemon, setListaPokemon] = useState([])

    const [pokemon, setPokemon] = useState(estadoInicial);
    const [buscando, setBuscando] = useState(false);

    const [inputValue, setInputValue] = useState('')

    const obtenerId = ( url ) => {
        return url.replace('https://pokeapi.co/api/v2/pokemon/','')
        .replace('/','');
    }


    const obtenerListaPokemon = async () => {
        try {

            const lista = await allPokemon();
            let nuevaLista = []
            lista.results.map( ( pokemon ) => {
                nuevaLista.push({ label: `${obtenerId(pokemon.url)} - ${ pokemon.name }`,
                                    id: `${obtenerId(pokemon.url)}`, name: `${ pokemon.name }`
                                        })
            });

            setListaPokemon(nuevaLista)
            
        } catch (error) {
            console.log(error)
        }
    }


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

    useEffect(() => {
        obtenerListaPokemon();
    }, [])


    const submit = (e) => {
        e.preventDefault();
        setPokemon({encontrado: false, textoError:''});
        setBuscando(true);
        let idBuscar = listaPokemon.find( pokemon =>{ if( pokemon.label == inputValue ) return true })

        if( idBuscar !== undefined ){
            buscarPokemon(idBuscar.id);
        }else{
            buscarPokemon(inputValue);
        }
        
    }

    let options = [
        { label: 'pikachu' },
        { label: '345' }
    ]


    return (
        <div className='buscar'>
            <form onSubmit={ submit } className='buscar__form'>
                    <Autocomplete
                        className='buscar__form-input'
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={listaPokemon.map((pokemon) => pokemon.label)}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Pokemon"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
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
