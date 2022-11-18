import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LIKE_CLEAR, myContext } from '../../App';
import '../../scss/card_like.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InfoIcon from '@mui/icons-material/Info';
import SinFoto from './SinFoto';

export default function CardLike( { pokemon } ) {

    const { dispatchLike } = useContext(myContext);

    const history = useNavigate();

    const borrar = () => {
        dispatchLike( { 
            type: LIKE_CLEAR,
            payload: {
                id: pokemon.id
            }
         } )
    }

    const info = () => {
        history(`/pokemon/${ pokemon.id }`);
    }

    return (
        <li className='likes__item'>
            {/* <span className='likes__item-id'>{ pokemon.id }</span> */}
            <div className='likes__item__foto-container'
                onClick = { info }
            >
                { pokemon.foto !== null?
                    <img src={ pokemon.foto } className='likes__item-img'></img>
                    :
                    <SinFoto className='likes__item-img' ></SinFoto>
                }
                <InfoIcon 
                    className='likes__info' 
                ></InfoIcon>
            </div>
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
