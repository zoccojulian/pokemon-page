import React, { useReducer , useContext, useEffect } from 'react';
import './App.css';
import BuscarPokemon from './component/pure/BuscarPokemon';
import ListaPokemon from './component/container/ListaPokemon';
import ListaLikes from './component/container/ListaLikes';


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
    <myContext.Provider value={ { stateLike, dispatchLike } }>
      <div className="App">
        {/* <h5>Favoritos</h5>
        { stateLike.map( ( pokemon , key) => 
          <img key={ key }
            src= { pokemon.foto }
            style={ { width:'50px' } }
          ></img>
         ) } */}
        <ListaLikes></ListaLikes>
        <BuscarPokemon></BuscarPokemon>
        <ListaPokemon></ListaPokemon>
      </div>
    </myContext.Provider>
    
  );
}

export default App;
