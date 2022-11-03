import React, { useEffect , useState } from 'react';
import { listaPokemon, onePokemon } from '../../service/FetchService';
import Card from '../pure/Card';

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
        <div>
            <h2>Lista</h2>
            { lista.map( ( pokemon , key ) => ( 
                <Card  
                key={ key } 
                { ...pokemon }
                ></Card>
             )) }
             <h1>{lista.length}</h1>
             <button onClick={ () => cargarPokemons( 20 ) } >
                CARGAR +
             </button>
        </div>
    )
}
