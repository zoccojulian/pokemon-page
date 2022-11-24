import React, { useState, useContext, useEffect , useRef } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { myContext } from '../../App';
import '../../scss/header.scss';
import imagenPokemon from '../../assets/imagen_header/pokemon_juntos.png'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import imagenTituloPokemon from '../../assets/imagen_header/pokemon.png'



export default function Header() {

  let urlActual = useLocation();

    const verUrlActual = ( ) => {

      switch (urlActual.pathname) {

        case '/':
          return 'HOME';
        case '/lista':
          return 'LISTA';
        case '/favoritos':
          return 'FAVORITOS'
        case '/buscar':
          return 'BUSCAR';
        default:
          return '';
      }
    }

    const initialLink = verUrlActual();
    const [stateLink, setStateLink] = useState(initialLink);

    const { stateLike }  = useContext(myContext)
    
    const itemLista = ( e ) => {

        if(e.target.id !== ''){
          setStateLink(e.target.id);
        }else if(e.target.parentNode.id !== '' ) {
          setStateLink(e.target.parentNode.id);
        }else if(e.target.parentNode.parentNode.id !== '' ) {
          setStateLink(e.target.parentNode.parentNode.id);
        }
    }


    const estrella = useRef(null);

    useEffect(() => {
        
      estrella.current.classList.remove( 'link__star-play' )
      setTimeout(() => {
        estrella.current.classList.add( 'link__star-play' )
      }, 100);

    }, [ stateLike ])

    useEffect(() => {
      console.log(stateLink)
      if ( stateLink === '' ){

        const nuevoUrl = verUrlActual();
        setStateLink(nuevoUrl);
      }
    });


    return (
        <header className='header'>
            <div className='header__img'>
              <img
                src={ imagenTituloPokemon }
                alt='imagen'
              ></img>
            </div>
            <ul className='App__lista'>
              <li className='App__lista__item'
              style={
                {
                  width : stateLink == 'HOME' ?
                    '300px' : '25px'
                }
              }
              >
                <Link 
                className='App__lista__item-link' to='/'
                onClick={ itemLista }
                id='HOME'
                >HOME</Link>
              </li>
              <li className='App__lista__item'
              style={
                {
                  width : stateLink == 'LISTA' ?
                    '300px' : '25px'
                }
              }
              >
                <Link 
                className='App__lista__item-link' to='/lista'
                onClick={ itemLista }
                id='LISTA'
                >Lista de Pokemon</Link>
              </li>
              <li className='App__lista__item'
              style={
                {
                  width : stateLink == 'BUSCAR' ?
                    '300px' : '25px'
                }
              }
              >
                <Link 
                className='App__lista__item-link' to='/buscar'
                onClick={ itemLista }
                id='BUSCAR'
                >Buscar</Link>
              </li>
              <li className='App__lista__item'
              style={
                {
                  width : stateLink == 'FAVORITOS' ?
                    '300px' : '25px'
                }
              }
              >
                <Link 
                className='App__lista__item-link' to='/favoritos'
                onClick={ itemLista }
                id='FAVORITOS'
                >
                  Favoritos  
                  <span> { stateLike.length !==0 ?
                     stateLike.length  : null
                   }<StarBorderIcon
                  className='link__star link__star-play'
                  ref={ estrella }
                  ></StarBorderIcon></span>
                </Link>
              </li>
              <img
              src={ imagenPokemon }
              className='lista__imagen'
              ></img>
            </ul>
          </header>
    )
}
