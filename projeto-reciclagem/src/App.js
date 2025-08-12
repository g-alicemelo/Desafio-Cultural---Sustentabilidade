import logo from './logo.svg';
import './App.css';
import Cabeçalho from './components/cabecalho';
import Hero from './components/hero';
import Carrossel from './components/carrossel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Cabeçalho/>
      </header>

      <section className='about-section'>
        <div className='about-container'>
        <Hero/>
        </div>
      </section>

      <section className='carousel-section'>
        <h1>Conheça as lixeiras</h1>
        <div className='carousel'>
        <Carrossel/>
        </div>
      </section>
    </div>
  );
}

export default App;
