import React, { useContext } from 'react'
import { LIKE_CLEAR, myContext } from '../../App'

export default function CardLike( { pokemon } ) {

    const { dispatchLike } = useContext(myContext);

    const borrar = () => {
        dispatchLike( { 
            type: LIKE_CLEAR,
            payload: {
                id: pokemon.id
            }
         } )
    }

    return (
        <li onClick= { borrar } className='likes__item'>
            <span className='likes__item-id'>{ pokemon.id }</span>
            <img src={ pokemon.foto } className='likes__item-img'></img>
            <span className='likes__item-name' >{ pokemon.name }</span>
        </li>
    )
}
