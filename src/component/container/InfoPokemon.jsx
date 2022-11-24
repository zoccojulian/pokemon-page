import React, { useEffect , useState , useContext } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { LIKE_ADD, LIKE_CLEAR, myContext } from '../../App';
import { onePokemon } from '../../service/FetchService';
import '../../scss/info_pokemon.scss';
import SinFoto from '../pure/SinFoto';

import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import ItemInfo from '../pure/ItemInfo';
import StarBorderIcon from '@mui/icons-material/StarBorder';



const initialState = {
    id: '',
    name: '',
    like: false,
    height: '',
    weight: '',
    image: '',
    stats: []
}

export default function InfoPokemon() {

    const { stateLike, dispatchLike } = useContext(myContext);
    const history = useNavigate();
    const [pokemon, setPokemon] = useState(initialState);
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

            //El dato de la altura viene en decímetros, lo transformamos
            //en Centímetro
            let pokemonHeight = pokemonFetch.height * 10;

            //El dato del peso viene en Hectogramos, lo transformamos
            //en Kg.
            let pokemonWeight = pokemonFetch.weight * 0.1;

            let listaStats = [];

            pokemonFetch.stats.map( ( stat ) => {
                
                let nombre = stat.stat.name;
                let valor = stat['base_stat'];

                listaStats.push( { nombre: nombre, valor: valor } );

            });

            setPokemon(
                {
                    id: pokemonFetch.id,
                    name: pokemonFetch.name,
                    like: like,
                    height: pokemonHeight,
                    weight: pokemonWeight,
                    image: pokemonFetch.sprites.other['official-artwork'].front_default,
                    stats: listaStats
                }
            )
            
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        
        busquedaPokemon();

    }, [])

    const toggleLike = () => {
        
        if(pokemon.like == true){

            dispatchLike( { 
                type: LIKE_CLEAR , 
                payload: {
                    id: pokemon.id
                }
            });
            
        }else{

            dispatchLike( { 
                type: LIKE_ADD , 
                payload: {
                    id: pokemon.id,
                    name: pokemon.name,
                    foto: pokemon.image
                }
            });

        }

        setPokemon({...pokemon, like: !pokemon.like})
    }


    return (
        <div className='info'>
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
                    <StarBorderIcon 
                    className='info__like'
                    onClick={ toggleLike }
                    style = { 
                        { 
                            filter: pokemon.like ? 'drop-shadow(0 0 5px tomato)' : 'drop-shadow(0 0 0 tomato)',
                            color: pokemon.like ? 'tomato' : 'black'
                        } 
                    }

                ></StarBorderIcon>
                </div>
                <div className='info__description'>
                    <div className='info__description-nombre'>
                        <h3>"{ pokemon.name }"</h3>
                    </div>
                    <div className='info__medidas'>
                        <div className='info__medidas-item'>
                            <HeightIcon className='medida__item-icon'></HeightIcon>
                            <h3 className='medida__item-titulo'>
                                Height: 
                            </h3>
                            <h4 className='medida__item-valor'>
                                { pokemon.height } cm.
                            </h4>
                        </div>
                        <div className='info__medidas-item'>
                            <ScaleIcon className='medida__item-icon' ></ScaleIcon>
                            <h3 className='medida__item-titulo'>
                                Weight: 
                            </h3>
                            <h4 className='medida__item-valor'>
                                { pokemon.weight } Kg.
                            </h4>
                        </div>
                    </div>
                    <div className='info__stadisticas'>
                        <h3 className='info__stadisticas-nombre'>Statistics</h3>
                        <ul className='info__stats'>
                            { pokemon.stats.map( ( stat, key ) => 
                                <ItemInfo
                                    nombre = { stat.nombre }
                                    valor = { stat.valor }
                                    key={ key }
                                ></ItemInfo>
                            ) }
                    </ul>
                    </div>
                </div>
                
            </div>

        </div>
    )
}
