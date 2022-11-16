import React, { useReducer , useState , useEffect } from 'react';
// import './App.css';
import './scss/app.scss';
import BuscarPokemon from './component/pure/BuscarPokemon';
import ListaPokemon from './component/container/ListaPokemon';
import ListaLikes from './component/container/ListaLikes';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';


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

  const [stateLink, setStateLink] = useState('HOME')

  
  const itemLista = ( e ) => {
    if(e.target.id !== ''){
      console.log(e.target.id)
      setStateLink(e.target.id);
    }else if(e.target.parentNode.id !== '' ) {
      setStateLink(e.target.parentNode.id);
    }else if(e.target.parentNode.parentNode.id !== '' ) {
      setStateLink(e.target.parentNode.parentNode.id);
    }
  }

  return (
    <div className="App">
      <myContext.Provider value={ { stateLike, dispatchLike } } >
        <Router>
          <header className='header'>
            <div className='header__img'>
              <img
                src='https://media.vandal.net/i/1200x630/10-2021/2021105724573_1.jpg'
                alt='imagen'
              ></img>
            </div>
            <ul className='App__lista'>
              <li className='App__lista__item'
              >
                <Link 
                className='App__lista__item-link' to='/'
                onClick={ itemLista }
                id='HOME' >HOME</Link>
                { stateLink == 'HOME' ?
                <RadioButtonCheckedIcon className='item__elegido'/> : null }
              </li>
              <li className='App__lista__item'
              >
                <Link 
                className='App__lista__item-link' to='/lista'
                onClick={ itemLista }
                id='LISTA'
                >Lista de Pokemon</Link>
                { stateLink == 'LISTA' ?
                <RadioButtonCheckedIcon className='item__elegido'/> : null }
              </li>
              <li className='App__lista__item'>
                <Link 
                className='App__lista__item-link' to='/buscar'
                onClick={ itemLista }
                id='BUSCAR'
                >Buscar</Link>
                { stateLink == 'BUSCAR' ?
                <RadioButtonCheckedIcon className='item__elegido'/> : null }
              </li>
              <li className='App__lista__item'>
                <Link 
                className='App__lista__item-link' to='/favoritos'
                onClick={ itemLista }
                id='FAVORITOS'
                >
                  Favoritos <span>{ stateLike.length }</span>
                </Link>
                { stateLink == 'FAVORITOS' ?
                <RadioButtonCheckedIcon className='item__elegido'/> : null }
              </li>
            </ul>
          </header>
          <main className='main'>
            <Routes>
              <Route exact path='/' element={ <Home></Home> } ></Route>
              <Route exact path='/lista' element={ <ListaPokemon></ListaPokemon> } ></Route>
              <Route exact path='/buscar' element={ <BuscarPokemon></BuscarPokemon> } ></Route>
              <Route exact path='/favoritos' element={ <ListaLikes></ListaLikes> } ></Route>
            </Routes>
          </main>
        </Router>
      </myContext.Provider>
    </div>
    
    
  );
}

export default App;
