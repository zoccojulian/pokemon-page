import React, { useEffect , useState , useContext } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { myContext } from '../../App';
import { onePokemon } from '../../service/FetchService';
import '../../scss/info_pokemon.scss';
import SinFoto from '../pure/SinFoto';


export default function InfoPokemon() {

    const { stateLike, dispatchLike } = useContext(myContext);
    const history = useNavigate();
    const [pokemon, setPokemon] = useState({});
    const { id } = useParams();

    const isLike = ( id ) => {

        if (stateLike.find( ( pokemon ) => {
            if(pokemon.id == id)
                return true
            } )){
                return true;
            } else {
                return false; 
            }
    }


    const volver = () => {
        history(-1);
    }



    const busquedaPokemon = async () => {
        try {
            
            const pokemonFetch = await onePokemon(id);
            let like = isLike(pokemonFetch.id);
            setPokemon(
                {
                    id: pokemonFetch.id,
                    name: pokemonFetch.name,
                    like: like,
                    height: pokemonFetch.height,
                    weight: pokemonFetch.weight,
                    image: pokemonFetch.sprites.other['official-artwork'].front_default
                }
            )
            
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        
        busquedaPokemon();

    }, [])


    return (
        <div className='info__container'>
            <div className='info__img'>
                { pokemon.image == null ? 
                    <SinFoto></SinFoto>
                    :
                    <img src={ pokemon.image }></img>
                }
                <button
                className='img__button-volver'
                onClick={ volver }
                >VOLVER</button>
            </div>
            <div className='info__description'>
                <div className='info__description-nombre'>
                    <h3>{ pokemon.name }</h3>
                </div>
                <div className='info__medidas'>
                    <div className='info__medidas-item'>
                        <h3 className='medida__item-titulo'>
                            Height
                        </h3>
                        <h4 className='medida__item-valor'>
                            { pokemon.height }
                        </h4>
                    </div>
                    <div className='info__medidas-item'>
                        <h3 className='medida__item-titulo'>
                            Weight
                        </h3>
                        <h4 className='medida__item-valor'>
                            { pokemon.weight }
                        </h4>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
