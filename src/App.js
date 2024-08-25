import './index.css';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Products } from './components/Products/Products';
import { Footer } from  './components/Footer/Footer';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Testimonials } from './components/Testimonials/Testimonials';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hero/>
      <About/>
      <Skills/>
      <Products/>
      <Testimonials/>
      <Footer/>
    </div>
  );
}

export default App;
