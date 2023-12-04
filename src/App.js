import logo from './logo.svg';
import './App.css';
import Pokedex from 'pokedex-promise-v2';

function App() {
  const P = new Pokedex();
  (async () => {
    const golduck = await P.getPokemonByName("golduck")
    console.log(golduck)
  })()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
