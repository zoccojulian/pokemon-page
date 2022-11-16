import React, { useContext } from 'react';
import { LIKE_CLEAR, myContext } from '../../App';
import '../../scss/card_like.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
        <li className='likes__item'>
            {/* <span className='likes__item-id'>{ pokemon.id }</span> */}
            <img src={ pokemon.foto } className='likes__item-img'></img>
            <div className='like__footer'>
                <span className='likes__item-name' >{ pokemon.name }</span>
                <DeleteForeverIcon 
                    className='likes__trash'
                    onClick= { borrar }
                ></DeleteForeverIcon>
            </div>
            
        </li>
    )
}
