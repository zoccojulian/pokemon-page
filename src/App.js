import React, { useReducer , useContext, useEffect } from 'react';
// import './App.css';
import './scss/app.scss';
import BuscarPokemon from './component/pure/BuscarPokemon';
import ListaPokemon from './component/container/ListaPokemon';
import ListaLikes from './component/container/ListaLikes';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './page/Home';


//Actions
export const LIKE_ADD = 'LIKE_ADD';
export const LIKE_CLEAR = 'LIKE_CLEAR';

//Estado inicial
const initialState = JSON.parse(localStorage.getItem('pokemonAPI')) || [];

//Contexto
export const myContext = React.createContext(null);

function App() {

  const likeReducer = ( state, action ) => {
    switch (action.type) {
      case LIKE_ADD:
        return [ ...state, 
          { id: action.payload.id, 
            name: action.payload.name,
            foto: action.payload.foto 
          } ].sort((a,b) => {
                  if(a.id > b.id){ return 1}
                    else if(a.id < b.id){ return -1}
                      else {return 0} })

      case LIKE_CLEAR:
        return state.filter( (pokemon) => pokemon.id !== action.payload.id )

      default:
        return state;
    }
  }

  const [stateLike, dispatchLike] = useReducer(likeReducer, initialState);

  useEffect(() => {

    localStorage.setItem('pokemonAPI', JSON.stringify(stateLike));
    
  }, [ stateLike ])


  return (
    <div className="App">
      <h1>POKEMON PAGE</h1>
      <myContext.Provider value={ { stateLike, dispatchLike } } >
        <Router>
          <ul className='App__lista'>
            <li className='App__lista__item'>
              <Link to='/'>HOME</Link>
            </li>
            <li className='App__lista__item'>
              <Link to='/lista'>Lista de Pokemon</Link>
            </li>
            <li className='App__lista__item'>
              <Link to='/buscar'>Buscar</Link>
            </li>
            <li className='App__lista__item'>
              <Link to='/favoritos'>
                Favoritos <span>{ stateLike.length }</span>
              </Link>
            </li>
          </ul>
          <Routes>
            <Route exact path='/' element={ <Home></Home> } ></Route>
            <Route exact path='/lista' element={ <ListaPokemon></ListaPokemon> } ></Route>
            <Route exact path='/buscar' element={ <BuscarPokemon></BuscarPokemon> } ></Route>
            <Route exact path='/favoritos' element={ <ListaLikes></ListaLikes> } ></Route>
          </Routes>
        </Router>
        </myContext.Provider>
    </div>
    
    
  );
}

export default App;
