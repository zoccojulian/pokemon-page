import React from 'react';
import '../../scss/itemInfo.scss';

export default function ItemInfo( { nombre , valor }) {

    return (
        <li className='info__stats__item'>
            <h3 className='info__stats__item-titulo' >{ nombre }</h3>
            <h4 className='info__stats__item-valor'>{ valor }</h4>
        </li>
    )
}
