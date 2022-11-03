import React, { useEffect , useState } from 'react';
import { listaPokemon, onePokemon } from '../../service/FetchService';
import Card from '../pure/Card';

//Estilos
import '../../scss/lista_pokemon.scss';

const initialState = [];

export default function ListaPokemon() {

    
    const [lista, setLista] = useState(initialState);

    const cargarPokemons = async ( desde ) => {
        try {
            
            const listaFetch = await listaPokemon( desde );

            let nuevaLista = []
            listaFetch.results.map( ( pokemon ) => {
                nuevaLista = [ ...nuevaLista, {name: pokemon.name, url: pokemon.url}]
            });

            console.log(nuevaLista)

            setLista([...lista,...nuevaLista])

        } catch (error) {
            console.log(error)
            
        }
    }
    

    useEffect(() => {
        
        cargarPokemons( 0 );
        
    }, []);

    return (
        <div className='lista__pokemon-container'>
            <h2 className='lista__pokemon-titulo'>Lista</h2>
            <ul className='lista__pokemon'>
                { lista.map( ( pokemon , key ) => ( 
                    <Card  
                    key={ key } 
                    { ...pokemon }
                    ></Card>
                )) }
            </ul>
            <h1>Total de Pokemon: {lista.length}</h1>
             <button className='button__cargar' onClick={ () => cargarPokemons( lista.length ) } >
                CARGAR 20+
             </button>
        </div>
    )
}
