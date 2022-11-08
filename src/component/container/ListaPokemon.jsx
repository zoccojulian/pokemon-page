import React, { useEffect , useState , useContext, useRef } from 'react';
import { listaPokemon, onePokemon, URL_POKEMON } from '../../service/FetchService';
import Card from '../pure/Card';
//Estilos
import '../../scss/lista_pokemon.scss';


const initialState =  JSON.parse(localStorage.getItem('pokemonListaPosicion')) || { lista: [], previous: '', next: '', numero: { desde: '0', hasta: '20'} };

let numeroPorPagina = 20;


export default function ListaPokemon() {
    
    const [pokemonPagina, setPokemonPagina] = useState(initialState);

    const cargarPokemons = async ( url ) => {
        try {
            
            const listaFetch = await listaPokemon( url );
            let nuevaLista = [];
            listaFetch.results.map( ( pokemon ) => {
                nuevaLista = [ ...nuevaLista, {name: pokemon.name, url: pokemon.url}]
            });

            let desde =  nuevaLista[0].url
                    .replace('https://pokeapi.co/api/v2/pokemon/','')
                    .replace('/','');
            let hasta = nuevaLista[nuevaLista.length - 1 ].url
                    .replace('https://pokeapi.co/api/v2/pokemon/','')
                    .replace('/','')


            let nuevoEstado = {
                lista: [...nuevaLista],
                previous: listaFetch.previous, 
                next: listaFetch.next,
                numero: {
                    desde: desde,
                    hasta: hasta
                }
            } 
            setPokemonPagina( nuevoEstado );


            localStorage.setItem('pokemonListaPosicion', JSON.stringify(nuevoEstado))

        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        
        cargarPokemons( `${URL_POKEMON}/?offset=${initialState.numero.desde}&limit=${numeroPorPagina}` );

    }, []);


    return (
        <div className='lista__pokemon-container'>
            <h2 className='lista__pokemon-titulo'>Lista</h2>
            <div>
                { pokemonPagina.previous !== null && (
                    <button
                    onClick={ () => cargarPokemons( pokemonPagina.previous ) }
                >PREVIOUS</button>
                ) }
                <span> { pokemonPagina.numero.desde } - { pokemonPagina.numero.hasta } </span>
                { pokemonPagina.next !== null && (
                    <button
                    onClick={ () => cargarPokemons( pokemonPagina.next ) }
                >NEXT</button>
                ) }
            </div>
            <ul className='lista__pokemon'>
                { pokemonPagina.lista.map( ( pokemon , key ) => ( 
                    <Card  
                    key={ key } 
                    { ...pokemon }
                    ></Card>
                )) }
            </ul>
        </div>
    )
}
