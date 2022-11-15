import React, { useEffect , useState , useContext, useRef } from 'react';
import { allPokemon, listaPokemon, onePokemon, URL_POKEMON } from '../../service/FetchService';
import Card from '../pure/Card';
import Pagination from '@mui/material/Pagination';

//Estilos
import '../../scss/lista_pokemon.scss';
import SelectorCantidad from '../pure/SelectorCantidad';

let numeroPorPagina = 20;

//TODO: Mejorar codigo

export default function ListaPokemon() {

    let initialPage = JSON.parse(localStorage.getItem('pokemonListaPosicion')) || {position:1, cantidadXPagina:20};

    const [pag, setPag] = useState(initialPage);

    const [cantidadTotal, setCantidadTotal] = useState({
        pokemon: 0,
        paginas: 0
    });


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

    const cargarDatosLista = async () => {

        try {
            const listaCompleta = await allPokemon();
            let cantidadPokemon = listaCompleta.count;
            let cantidadPaginas = Math.ceil(listaCompleta.count / pag.cantidadXPagina);
            setCantidadTotal(
                {
                    pokemon: cantidadPokemon,
                    paginas: cantidadPaginas
                }
            )

        } catch (error) {
            
        }
    }

    const [scroll, setScroll] = useState({
        windowInner: window.innerHeight, 
        documentElement: document.documentElement.clientHeight  
    });

    useEffect(() => {

        cargarDatosLista ();

        let numero = (pag.position*pag.cantidadXPagina) - pag.cantidadXPagina;
        cargarPokemons( `${URL_POKEMON}/?offset=${numero}&limit=${pag.cantidadXPagina}` );

        
        window.addEventListener( 'scroll', (e) => {
            setScroll(
                {
                    windowInner: window.innerHeight, 
                    documentElement: document.documentElement.clientHeight  
                }
            ); 
        });

    }, [ ]);


    useEffect(() => {
        let cantidadPaginas = Math.ceil(cantidadTotal.pokemon / pag.cantidadXPagina);
        setCantidadTotal(
            {
                ...cantidadTotal,
                paginas: cantidadPaginas
            }
        )

        let desde = (pag.position*pag.cantidadXPagina) - pag.cantidadXPagina;
        setPokemonPagina([])
        cargarPokemons( `${URL_POKEMON}/?offset=${desde}&limit=${pag.cantidadXPagina}` );
    
    }, [pag]);

    const guardarJSON = ( position , cantidadxPagina ) => {
        localStorage.setItem('pokemonListaPosicion', JSON.stringify({position:position, cantidadXPagina:cantidadxPagina}))
    }

    const cambioEstado = (event, value) => {
        setPag({...pag, position:value})
        let numero = (value*pag.cantidadXPagina) - pag.cantidadXPagina
        cargarPokemons( `${URL_POKEMON}?offset=${ numero }&limit=${pag.cantidadXPagina}`);
        guardarJSON( value , pag.cantidadXPagina );
        
    }

    const cambioNumeroXPaginas = ( numero ) => {

        setPag({ position: 1 , cantidadXPagina: numero });
        guardarJSON( 1 , numero );
    }

    return (
        <div className='lista__pokemon-container'>
            <h2 className='lista__pokemon-titulo'>Lista</h2>
            <SelectorCantidad
                cambioNumeroXPaginas= { cambioNumeroXPaginas }
                initialStateSeleccion = { initialPage.cantidadXPagina }
            ></SelectorCantidad>
            <Pagination count={ cantidadTotal.paginas } color="primary"
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
