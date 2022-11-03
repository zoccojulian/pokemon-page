import logo from './logo.svg';
import './App.css';
import BuscarPokemon from './component/pure/BuscarPokemon';
import ListaPokemon from './component/container/ListaPokemon';


function App() {
  return (
    <div className="App">
      <ListaPokemon></ListaPokemon>
      <BuscarPokemon></BuscarPokemon>
    </div>
  );
}

export default App;
