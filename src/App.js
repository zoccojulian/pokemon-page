import logo from './logo.svg';
import './App.css';
import BuscarPokemon from './component/pure/BuscarPokemon';
import ListaPokemon from './component/container/ListaPokemon';

function App() {
  return (
    <div className="App">
      <BuscarPokemon></BuscarPokemon>
      <ListaPokemon></ListaPokemon>
    </div>
  );
}

export default App;
