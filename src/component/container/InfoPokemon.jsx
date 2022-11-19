import React, { useEffect , useState } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { onePokemon } from '../../service/FetchService';

export default function InfoPokemon() {


    const history = useNavigate();
    const [pokemon, setPokemon] = useState({})

    //TODO: no usar lo que trae el fetch.
    //Armar un {objeto} inicial con los datos que voy a utilizar nulos o en cero o en ''

    const volver = () => {
        history(-1);
    }

    const { id } = useParams();

    const busquedaPokemon = async () => {
        try {
            
            const pokemonFetch = await onePokemon(id);
            setPokemon(pokemonFetch)
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        
        busquedaPokemon();

    }, [])


    return (
        <div>
            <span> { pokemon.id } - {pokemon.name}</span>
            <button
                onClick={ volver }
                style= { { fontSize: '2rem' } }
            >
                Volver
            </button>
        </div>
    )
}
