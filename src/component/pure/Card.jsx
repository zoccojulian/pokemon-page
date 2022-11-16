import React, { useState , useRef, useEffect, useContext } from 'react';
import { onePokemon } from '../../service/FetchService';
import PropTypes from 'prop-types';
import { LIKE_ADD, LIKE_CLEAR, myContext } from '../../App';

import StarBorderIcon from '@mui/icons-material/StarBorder';

//Estilos
import '../../scss/card.scss';
import CargaCircular from './CargaCircular';
import SinFoto from './SinFoto';



const initialState = {
    // id: 0,
    name: '',
    foto: '',
    like: false
};


export default function Card( { name , scroll} ) {

    const [cargando, setCargando] = useState(true);
    
    //contexto para ver si el pokemon esta en los likes, y sacarlo o ponerlo
    const { stateLike, dispatchLike } = useContext(myContext);

    const [pokemon, setPokemon] = useState(initialState);

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

    const cargarPokemon = async () => {

        try {
            let datosPokemon = await onePokemon(name);
            let id = datosPokemon.id;
            // let nombre = datosPokemon.forms[0].name ;
            let nombre = datosPokemon.name ;
            let foto = '';
            if( datosPokemon.sprites.other.dream_world.front_default !== null ){
                foto = datosPokemon.sprites.other.dream_world.front_default
            }else{
                foto = datosPokemon.sprites.other['official-artwork'].front_default
            }
            console.log(foto)
            let like = isLike( id );

            setPokemon({id, name, foto, like});

            setCargando(false);
            
        } catch (error) {
            console.log(error);
        }
    }

    //Manejo del Scroll para que aparezca cuando aparece en pantalla

    const [isAnimado, setIsAnimado] = useState(false);
    const li = useRef(null);

    const inAnimacion = ( li ) => {
        setIsAnimado(true);
        li.current.classList.add('in');
        
    }

    useEffect(() => {

        let top = li.current.getBoundingClientRect().top;
        if(top < (scroll.windowInner || scroll.documentElement) && !isAnimado){

            //Este if se fija si cuando se activa este useEffect, todavia esta cargando
            //(cargando == true) le da 1 segundo para que termine y luego hace ingresar
            //la card con animacion.
            //Si termino de cargar, (cargando == false), activa la animacion.
            if(cargando) {
                setTimeout( () => { inAnimacion( li ) } , 1000)
            }else{
                inAnimacion( li );
            }
        }

    }, [ scroll ])


    useEffect(() => {

        cargarPokemon();

    }, [ ]);


    useEffect(() => {

        if ( isLike( pokemon.id ) !== pokemon.like ) {
            setPokemon( { ...pokemon, like: !pokemon.like } )
        }
        
    }, [ stateLike ])

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
                    foto: pokemon.foto
                }
            });

        }

        setPokemon({...pokemon, like: !pokemon.like})
    }

    return (
        <li 
            className='lista__pokemon-li'
            ref={ li }
            style = {
                {
                    filter: pokemon.like ? 'drop-shadow(0 0 5px tomato)' : 'drop-shadow(0 0 0 tomato)'
                }
            }
        >
            { cargando || !isAnimado ? 
                <CargaCircular ></CargaCircular>
                :
                null
            }
            <div className='lista__pokemon-item'>
                <div className='lista__item-img-container'>
                    {/* <img src= { pokemon.foto } className='lista__item-img'></img> */}
                    { pokemon.foto !== null ?  
                        <img src= { pokemon.foto } className='lista__item-img'></img>
                        :
                        <SinFoto></SinFoto>
                    }
                </div>
                <h3 className='lista__item-id' > {pokemon.id } </h3>
                <h4 className='lista__item-name' > { pokemon.name } </h4>
                {/* <h5 className='lista__item-like' >{ pokemon.like ? 'like' : '' }</h5> */}
                <StarBorderIcon 
                    className='lista__item-like'
                    onClick={ toggleLike }
                    style = { 
                        { 
                            filter: pokemon.like ? 'drop-shadow(0 0 5px tomato)' : 'drop-shadow(0 0 0 tomato)',
                            color: pokemon.like ? 'tomato' : 'black'
                        } 
                    }

                ></StarBorderIcon>
            </div>
        </li>
    )
}






Card.propTypes = {
    name: PropTypes.string.isRequired
}





