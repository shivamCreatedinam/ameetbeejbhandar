import './index.css';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Products } from './components/Products/Products';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hero/>
      <Products/>
      <Footer/>
    </div>
  );
}

export default App;
