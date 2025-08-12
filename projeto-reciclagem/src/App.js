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
        <footer>
          <img src='./image/Logo-Youx-Lab.png' className="logo" alt="Logo Youx Lab"/>
        </footer>
      </section>
    </div>
  );
}

export default App;
