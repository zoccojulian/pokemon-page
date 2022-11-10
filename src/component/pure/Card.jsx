import React, { useState , useRef, useEffect, useContext } from 'react';
import { onePokemon } from '../../service/FetchService';
import PropTypes from 'prop-types';
import { LIKE_ADD, LIKE_CLEAR, myContext } from '../../App';
import '../../scss/card.scss';
import { cleanup } from '@testing-library/react';

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
            let nombre = datosPokemon.forms[0].name ;
            let foto = '';
            if( datosPokemon.sprites.other.dream_world.front_default !== null ){
                foto = datosPokemon.sprites.other.dream_world.front_default
            }else{
                foto = datosPokemon.sprites.other['official-artwork'].front_default
            }
            
            let like = isLike( id );

            setPokemon({id, name, foto, like});
            setCargando(false);
            

        } catch (error) {
            
        }
    }

    //Manejo del Scroll para que aparezca cuando aparece en pantalla

    const [bandera, setBandera] = useState(false);
    const li = useRef(null);

    useEffect(() => {
        let top = li.current.getBoundingClientRect().top;

        if(top < (scroll.windowInner || scroll.documentElement) && !bandera){

            li.current.classList.add('in');
            setBandera(true)
        }

    }, [ scroll ])


    useEffect(() => {

        setCargando(true);
        cargarPokemon();

    }, [ name ]);


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
            onClick={ toggleLike }
            ref={ li }
        >
            { cargando ? <span className='lista__item-cargando' >CARGANDO...</span> : null }
            <div className='lista__pokemon-item' style={ { visibility: cargando ? 'hidden' : 'visible' } }>
                <div className='lista__item-img-container' style={ { visibility: cargando ? 'hidden' : 'visible' } }>
                    <img src= { pokemon.foto } className='lista__item-img'
                    onChange={() => console.log('hola')}></img>
                </div>
                <h3 className='lista__item-id' > {pokemon.id } </h3>
                <h4 className='lista__item-name' > { pokemon.name } </h4>
                <h5 className='lista__item-like' >{ pokemon.like ? 'like' : '' }</h5>
            </div>
            
        </li>
    )
}






Card.propTypes = {
    name: PropTypes.string.isRequired
}





