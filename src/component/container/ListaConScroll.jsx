import { ListAltOutlined, ListAltRounded } from '@mui/icons-material';
import React, { useState , useEffect } from 'react';
import '../../scss/listaConScroll.scss'
import Card from '../pure/Card';

export default function ListaConScroll( { lista } ) {


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
        <ul className='lista__pokemon'>
                { lista.map( ( pokemon , key ) => ( 
                    <Card  
                    key={ key } 
                    { ...pokemon}
                    scroll= { scroll }
                    ></Card>
                )) }
            </ul>
    )
}
