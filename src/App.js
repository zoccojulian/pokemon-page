import React, { useReducer , useContext, useEffect } from 'react';
import './App.css';
import BuscarPokemon from './component/pure/BuscarPokemon';
import ListaPokemon from './component/container/ListaPokemon';


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
          } ]

      case LIKE_CLEAR:
        return state.filter( (pokemon) => pokemon.id !== action.payload.id )

      default:
        return state;
    }
  }

  const [stateLike, dispatchLike] = useReducer(likeReducer, initialState);

  useEffect(() => {
    localStorage.setItem('pokemonAPI', JSON.stringify(stateLike))
  }, [ stateLike ])

  return (
    <myContext.Provider value={ { stateLike, dispatchLike } }>
      <div className="App">
        <h5>Favoritos</h5>
        { stateLike.map( ( pokemon , key) => 
          <img key={ key }
            src= { pokemon.foto }
            style={ { width:'50px' } }
          ></img>
         ) }
        <BuscarPokemon></BuscarPokemon>
        <ListaPokemon></ListaPokemon>
      </div>
    </myContext.Provider>
    
  );
}

export default App;
