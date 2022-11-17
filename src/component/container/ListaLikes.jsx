import React, { useContext, useState, useEffect } from 'react';
import { LIKE_CLEAR, myContext } from '../../App';
import CardLike from '../pure/CardLike';
import '../../scss/lista_likes.scss'

export default function ListaLikes() {

    const { stateLike } = useContext(myContext);

    const [scroll, setScroll] = useState({
        windowInner: window.innerHeight, 
        documentElement: document.documentElement.clientHeight  
    });

    useEffect(() => {

        window.addEventListener( 'scroll', (e) => {
            setScroll(
                {
                    windowInner: window.innerHeight, 
                    documentElement: document.documentElement.clientHeight  
                }
            ); 
        });

    }, [ ]);

    return (
        <div className='likes__container'>
            <h3 className='likes__name'>Favoritos</h3>
            <ul className='likes__lista'>
                { stateLike.map( ( pokemon , key ) => 
                <CardLike key={ key } pokemon= { pokemon }></CardLike>
                 ) }
            </ul>
        </div>
        
    )
}
