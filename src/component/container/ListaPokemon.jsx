import React, { useEffect , useState , useContext } from 'react';
import { listaPokemon, onePokemon, URL_POKEMON } from '../../service/FetchService';
import Card from '../pure/Card';
//Estilos
import '../../scss/lista_pokemon.scss';


const initialState = { lista: [], previous: '', next: '' };

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

            setPokemonPagina(
                {
                    lista: [...nuevaLista],
                    previous: listaFetch.previous, 
                    next: listaFetch.next
                }
            );

        } catch (error) {
            console.log(error)
            
        }
    }
    

    useEffect(() => {
        
        cargarPokemons( `${URL_POKEMON}/?offset=0&limit=${numeroPorPagina}` );
        
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
