import React, { useReducer , useContext } from 'react';
import './App.css';
import BuscarPokemon from './component/pure/BuscarPokemon';
import ListaPokemon from './component/container/ListaPokemon';


//Actions
const LIKE_ADD = 'LIKE_ADD';
const LIKE_CLEAR = 'LIKE_CLEAR';

//Estado inicial
const initialState = JSON.parse(localStorage.getItem('pokemonAPI')) || [{id:0, name:'julian'}];

//Contexto
export const myContext = React.createContext(null);

function App() {

  const likeReducer = ( state, action ) => {
    switch (action.type) {
      case LIKE_ADD:
        return [ ...state, { id: action.payload.id, name: action.payload.name } ]

      case LIKE_CLEAR:
        return state.filter( (pokemon) => pokemon.id !== action.payload.id )

      default:
        return state;
    }
  }

  const [stateLike, dispatchLike] = useReducer(likeReducer, initialState);


  return (
    <myContext.Provider value={ { stateLike, dispatchLike } }>
      <div className="App">
        { stateLike.map( ( pokemon , key) => <h4 key={ key } >{ pokemon.name }</h4> ) }
        <BuscarPokemon></BuscarPokemon>
        <ListaPokemon></ListaPokemon>
      </div>
    </myContext.Provider>
    
  );
}

export default App;
