import React, { useEffect , useState , useContext, useRef } from 'react';
import { listaPokemon, onePokemon, URL_POKEMON } from '../../service/FetchService';
import Card from '../pure/Card';
import Pagination from '@mui/material/Pagination';

//Estilos
import '../../scss/lista_pokemon.scss';

let numeroPorPagina = 20;

//TODO: Mejorar codigo

export default function ListaPokemon() {

    let initialPage = JSON.parse(localStorage.getItem('pokemonListaPosicion')) || {position:1};

    const [pag, setPag] = useState(initialPage);

    const initialState =  [];
    
    const [pokemonPagina, setPokemonPagina] = useState(initialState);

    const cargarPokemons = async ( url ) => {
        try {
            
            const listaFetch = await listaPokemon( url );
            let nuevaLista = [];
            listaFetch.results.map( ( pokemon ) => {
                nuevaLista = [ ...nuevaLista, {name: pokemon.name, url: pokemon.url}]
            });

            setPokemonPagina( nuevaLista );

        } catch (error) {
            console.log(error)
            
        }
    }

    const [scroll, setScroll] = useState({
        windowInner: window.innerHeight, 
        documentElement: document.documentElement.clientHeight  
    });

    useEffect(() => {

        let numero = (pag.position*20) - 20;
        cargarPokemons( `${URL_POKEMON}/?offset=${numero}&limit=${numeroPorPagina}` );

        
        window.addEventListener( 'scroll', (e) => {
            setScroll(
                {
                    windowInner: window.innerHeight, 
                    documentElement: document.documentElement.clientHeight  
                }
            ); 
        });

    }, [ ]);

    const cambioEstado = (event, value) => {
        setPokemonPagina([]);
        setPag({position:value})
        let numero = (value*20) - 20
        cargarPokemons( `${URL_POKEMON}/?offset=${ numero }&limit=${numeroPorPagina}`)
        localStorage.setItem('pokemonListaPosicion', JSON.stringify({position:value}))
    }

    return (
        <div className='lista__pokemon-container'>
            <h2 className='lista__pokemon-titulo'>Lista</h2>
            
            <Pagination count={58} color="primary"
                onChange={ cambioEstado }
                page={pag.position}
            />
            <ul className='lista__pokemon'>
                { pokemonPagina.map( ( pokemon , key ) => ( 
                    <Card  
                    key={ key } 
                    { ...pokemon}
                    scroll= { scroll }
                    ></Card>
                )) }
            </ul>
        </div>
    )
}
