import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { myContext } from '../../App';
import '../../scss/header.scss';
import imagenPokemon from '../../assets/imagen_header/pokemon_juntos.png'
export default function Header() {

    const [stateLink, setStateLink] = useState('HOME')

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
    return (
        <header className='header'>
            <div className='header__img'>
              <img
                src='https://media.vandal.net/i/1200x630/10-2021/2021105724573_1.jpg'
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
                  Favoritos <span>{ stateLike.length }</span>
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
